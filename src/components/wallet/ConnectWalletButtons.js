import Grid from '@mui/material/Grid';
import ConnectWalletButton from 'components/wallet/ConnectWalletButton.js';

function ConnectWalletButtons(props) {
    return (
        <Grid container direction='column' justifyContent={'center'} alignItems='center' spacing={2}>
            <Grid item xs={4}>
                <ConnectWalletButton 
                    text='MetaMask' 
                    closeMenu={props.handleClose} 
                    type='metaMask' 
                    onConnect={props.onConnect}
                    disabled={false}
                />
            </Grid>
            <Grid item xs={4}>
                <ConnectWalletButton 
                    text='Coinbase Wallet coming soon!' 
                    closeMenu={props.handleClose}
                    type='coinbaseWallet'
                    disabled={true}
                />
            </Grid>
            <Grid item xs={4}>
                <ConnectWalletButton 
                    text='WalletConnect coming soon!' 
                    closeMenu={props.handleClose} 
                    type='walletConnect'
                    disabled={true}
                />
            </Grid>
        </Grid>
    );
}

export default ConnectWalletButtons;