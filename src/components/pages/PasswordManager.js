import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import CustomButton from 'components/general/CustomButton';
import LoginList from 'components/manager/dashboard/LoginList';
import MetaMaskOnboarding from '@metamask/onboarding';
import NewLoginBar from 'components/manager/dashboard/NewLoginBar';
import SelectNetwork from 'components/manager/dashboard/SelectNetwork';
import Login from 'model/Login';
import Params from 'model/Params';
import Vault from 'model/Vault';
import { fetchEncryptionPublicKey } from 'utils/encryption';
import { getVaultPtr, updateVaultPtr } from 'ethereum/p6d';
import { getVault, addVault, unpinVault } from 'utils/ipfs';
import { getPersonalSignature } from 'utils/signature';
import { getPasswordFromSignature } from 'utils/password'; 
import { getSignatureMessage, HEAD_TEMPLATE_ID } from 'utils/message';
import { isChainSupported } from 'config/chains';
import { useEffect, useState, useRef } from 'react';
import { useWeb3React } from '@web3-react/core';
import { getAccountData, updateAccountData } from 'utils/localStorage';
import { PWD_LENGTH, LOCAL_STORAGE_TTL } from 'config';
import { ReactComponent as MetaMaskSvg } from 'assets/wallets/metamask.svg';
import 'styles/App.css';

function PasswordManager(props) {
    const [vaultPtr, setVaultPtr] = useState(null);
    const [vault, setVault] = useState(null);
    const [logins, setLogins] = useState(null);
    const [pubKey, setPubKey] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const { account, active, chainId } = useWeb3React();
    const onboarding = useRef();

    useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
        setInitialized(false);
        (async () => {
            if (!active) {
                reset();
                setInitialized(true);
            } else if (isChainSupported(chainId)) {
                let success = fetchVaultFromLocalStorage();
                if (!success) success = await fetchVaultFromIPFS();
                setInitialized(success);
            } else {
                console.log("Can't initialize at this time.")
            }
        })();
    }, [active, account, chainId]);

    function fetchVaultFromLocalStorage() {
        const data = getAccountData(account);
        if (!data) return false;
        setPubKey(data.pubKey);
        if (data.expiryTime > Date.now() && data.chainId == chainId.toString()) {
            setVaultPtr(data.vaultPtr);
            setVault(data.vault);
            setLogins(null);
            return true;
        }
        return false;
    }

    async function fetchVaultFromIPFS() {
        try {
            const ptr = await getVaultPtr();
            setVaultPtr(ptr);
            if (ptr === '') {
                setLogins([]);
            } else {
                const vaultContent = await getVault(ptr);
                updateAccountData(account, {
                    chainId: chainId,
                    vaultPtr: ptr, 
                    vault: vaultContent, 
                    expiryTime: (Date.now() + LOCAL_STORAGE_TTL)
                });
                setVault(vaultContent);
                setLogins(null);
            }
        } catch (error) {
            console.log(error);
            reset();
            return false;
        }
        return true;
    }

    function reset() {
        setVaultPtr(null);
        setVault(null);
        setLogins(null);
    }

    function generateVault(loginsToStore, encryptionPublicKey) {
        let newVault = new Vault(loginsToStore);
        const encryptedVault = newVault.encrypt(encryptionPublicKey);
        return encryptedVault;
    }

    // vault is the encrypted data sent to, stored in, and retrieved from IPFS
    // vaultPtr is an identifier used to retrieve the user's vault (doesn't have to be IPFS)
    // logins is an array of Login objects. Array is serialized and encrypted in order to create a vault
    async function updateVault(newLogins) {
        let encryptionPublicKey = pubKey
        if (!encryptionPublicKey)
            encryptionPublicKey = await fetchEncryptionPublicKey(account.toString());
        const newVault = generateVault(newLogins, encryptionPublicKey);
        const newVaultPtr = await addVault(newVault);
        const oldVaultPtr = vaultPtr;
        const tx = await updateVaultPtr(newVaultPtr);
        tx.wait(1) // Wait for tx to be confirmed, then unpin oldVaultPtr
            .then(async () => unpinVault(oldVaultPtr).catch(error => console.error(error)))
            .catch((error) => console.error(error));
        setVaultPtr(newVaultPtr);
        setVault(newVault);
        setPubKey(encryptionPublicKey);
        updateAccountData(account, {
            chainId: chainId,
            vaultPtr: newVaultPtr, 
            vault: newVault, 
            pubKey: encryptionPublicKey,
            expiryTime: (Date.now() + LOCAL_STORAGE_TTL)});
    }

    async function onAdd(tag, callback) {
        const params = new Params(HEAD_TEMPLATE_ID, PWD_LENGTH);
        const newLogins = [new Login(tag, params), ...logins];
        await updateVault(newLogins)
            .then(() => {
                setLogins(newLogins);
                props.emitNotification(1);
            })
            .catch((error) => {
                props.emitNotification(error.code);
            });
        callback();
    }

    async function onGet(login) {
        const message = getSignatureMessage(login);
        let signature;
        try {
            signature = await getPersonalSignature(message);
        } catch (error) {
            props.emitNotification(error.code);
        }
        const password = getPasswordFromSignature(signature, login.params);
        // login.password = password;
        // const newLogins = logins.map(l => l.id === login.id ? login : l);
        // setLogins(newLogins);
        window.addEventListener('focus', async () => {
            await navigator.clipboard.writeText(password);
            props.emitNotification(2);
        }, {once: true});
    }

    async function onCopy(login) {
        await navigator.clipboard.writeText(login.password);
        props.emitNotification(2);
    }

    async function onUpdate(_login, callback) {
        let login = _login.copy();
        login.bumpVersion();
        // login.password = null;
        const newLogins = logins.map(l => l.id === login.id ? login : l);
        await updateVault(newLogins)
            .then(() => { 
                setLogins(newLogins);
                props.emitNotification(3);
            })
            .catch((error) => props.emitNotification(error.code));
        callback();
    }

    async function onDelete(login, callback) {
        const newLogins = logins.filter(l => l.id !== login.id);
        await updateVault(newLogins)
            .then(() => { 
                setLogins(newLogins);
                props.emitNotification(4);
            })
            .catch((error) => {
                callback();
                props.emitNotification(error.code);
            });
    }

    async function onDecrypt() {
        const decryptedVault = await Vault.decrypt(vault);
        setLogins(decryptedVault.logins);
    }

    let content;
    if (!props.connected && MetaMaskOnboarding.isMetaMaskInstalled()) {
        content = <Typography>Please connect wallet</Typography>
    } else if (!props.connected) {
        content=
            <CustomButton 
                onClick={() => onboarding.current.startOnboarding()}
                style={{width: '50%'}}
            >
                <Grid container direction='row' justifyContent={'space-between'} alignItems='flex-start'>
                    <Grid item>
                        <Typography>Install MetaMask Wallet</Typography>
                    </Grid>
                    <Grid item>
                        <Icon style={{float: 'right'}}>
                            <MetaMaskSvg />
                        </Icon>
                    </Grid>
                </Grid>            
            </CustomButton>
    } else if (!isChainSupported(chainId)) {
        content = <SelectNetwork emitNotification={props.emitNotification}/>
    } else if (!initialized) {
        content = 
            <Fade
                in={!initialized}
                style={{transitionDelay: '250ms'}}
                unmountOnExit
            >
                <div style={{width: '75%', margin: 'auto'}}>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
            </Fade>
    } else if (vault && logins === null) {
        content = 
            <CustomButton id='decrypt-button' onClick={onDecrypt}>
                <Typography noWrap={true}>Decrypt Your Logins</Typography>
            </CustomButton>
    } else if (logins) {
        content =
            <div>
                <NewLoginBar onAdd={onAdd}/>
                <LoginList 
                    logins={logins} 
                    onGet={onGet}
                    onCopy={onCopy}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            </div>
    } else {
        content = <Typography>Network Error</Typography>;
    }

    return(
        <div id='password-manager'>
            {content}
        </div>
    );
}

export default PasswordManager;