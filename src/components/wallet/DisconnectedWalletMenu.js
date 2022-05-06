import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ConnectWalletButtons from 'components/wallet/ConnectWalletButtons.js';
import CustomButton from 'components/general/CustomButton.js';
import { ReactComponent as MetaMaskSvg } from 'assets/wallets/metamask.svg';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useState, useEffect, useRef } from 'react';
import 'styles/App.css';

function DisconnectedWalletMenu(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = async function () {
        await new Promise(resolve => setTimeout(resolve, 75));
        setOpen(false);
    };
    const onboarding = useRef();

    useEffect(() => {
            if (!onboarding.current) {
                onboarding.current = new MetaMaskOnboarding();
            }
        }, 
    []);

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
    };

    let menu;
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        menu = 
            <ConnectWalletButtons 
                onConnect={props.onConnect} 
                handleClose={handleClose}
                emitNotification={props.emitNotification}
            />
    } else {
        menu =
            <CustomButton 
                onClick={() => onboarding.current.startOnboarding()}
                id='connect-wallet-button' 
                disabled={props.disabled}
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
    }

    return (
        <div id='menu'>
            <Chip 
                sx={{width: 1}} 
                color='primary' 
                label={'Connect'} 
                variant='outlined' 
                onClick={handleOpen}
            />
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>                    
                    {menu}
                </Box>
            </Modal>
        </div>
    );
}

export default DisconnectedWalletMenu;