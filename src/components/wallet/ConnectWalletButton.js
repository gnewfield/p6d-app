import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import CustomButton from 'components/general/CustomButton';
import coinbase from 'assets/wallets/coinbase.png';
import walletConnect from 'assets/wallets/walletConnect.png';
import { ReactComponent as MetaMaskSvg } from 'assets/wallets/metamask.svg';
import { connectors } from 'components/wallet/Connectors';
import { useWeb3React } from '@web3-react/core';
import 'styles/App.css';

function ConnectWalletButton(props) {
    const { activate, active } = useWeb3React();

    async function connect(connector) {
        try {
            if (!active) await activate(connector);
            await props.closeMenu();
            props.onConnect();
            window.localStorage.setItem('provider', props.type);
        } catch (ex) {
            console.log(ex);
        }
    }

    function getIcon(type) {
        switch(type) {
            case 'metaMask':
                return(
                    <Icon style={{float: 'right'}}>
                        <MetaMaskSvg />
                    </Icon>
                );
            case 'coinbaseWallet':
                return <img src={coinbase} className='network-logo'/>;
            case 'walletConnect':
                return <img src={walletConnect} className='network-logo'/>;
            default:
                console.log("No image for wallet");
                return;
        }
    }

    return(
        <CustomButton onClick={() => connect(connectors[props.type])} id='connect-wallet-button' disabled={props.disabled}
        style={{width: '300px'}}>
            <Grid container direction='row' justifyContent={'space-between'} alignItems='flex-start'>
                <Grid item>
                    <Typography>{props.text}</Typography>
                </Grid>
                <Grid item>
                    {getIcon(props.type)}
                </Grid>
            </Grid>            
        </CustomButton>
    );
}

export default ConnectWalletButton;