import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import NetworkMenu from 'components/wallet/NetworkMenu';
import { useWeb3React } from '@web3-react/core';

function ConnectedWalletMenu(props) {
    const { account, connector, deactivate} = useWeb3React();

    function disconnect() {
        try {
            deactivate(connector);
            props.onDisconnect();
            window.localStorage.setItem('provider', undefined);
        } catch (ex) {
            console.log(ex);
        }
    }

    return(
        <div style={{width: 'auto', margin: '0px'}}>
        <Grid container justifyContent='center' alignItems='center' direction='row' spacing={0.5}>
            <Grid item>
                    <NetworkMenu emitNotification={props.emitNotification}/>
            </Grid>
            <Grid item>
                <Chip 
                    sx={{width: 1}} 
                    color='primary' 
                    label={account.substring(0,5) + "..." + account.substring(account.length - 4)} 
                    variant='outlined' 
                    onClick={async () => {
                        await navigator.clipboard.writeText(account);
                        props.emitNotification(5);
                    }}
                />
            </Grid>
            <Grid item>
                <Chip 
                    sx={{width: 1}} 
                    color='primary' 
                    label={'Disconnect'} 
                    variant='outlined' 
                    onClick={() => { disconnect(); props.emitNotification(7)}}
                />
            </Grid>
        </Grid>
        </div>
    );
}

export default ConnectedWalletMenu;