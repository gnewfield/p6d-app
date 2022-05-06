import Grid from '@mui/material/Grid';
import PageSelector from 'components/header/PageSelector';
import WalletMenu from 'components/wallet/WalletMenu.js';
import { ReactComponent as Logo } from '../assets/p6d_logo.svg';
import { useWindowDimension  } from 'utils/hooks/useWindowDimension';

function Header(props) {

    const [width, height] = useWindowDimension();

    if (width < 1000) {
        return(
            <Grid container alignItems='center' direction='column'>
                <Grid container justifyContent='space-between' direction='row'>
                    <Grid item>
                        <Logo id='logo' />
                    </Grid>
                    <Grid>
                        <WalletMenu 
                            connected={props.connected}
                            onConnect={props.onConnect}
                            onDisconnect={props.onDisconnect}
                            emitNotification={props.emitNotification}
                        />
                    </Grid>
                </Grid>
                <Grid container direction='row'>
                    <Grid item xs sx={{display: "flex", justifyContent: "center"}}>
                        <PageSelector page={props.page} onPageChange={props.onPageChange}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    } else {
        return(
            <Grid container justifyContent='center' alignItems='flex-start' direction='row'>
                <Grid item xs sx={{display: "flex", justifyContent: "flex-start"}}>
                    <Logo id='logo' />
                </Grid>
                <Grid item xs sx={{display: "flex", justifyContent: "center"}}>
                    <PageSelector page={props.page} onPageChange={props.onPageChange}/>
                </Grid>
                <Grid item xs sx={{display: "flex", justifyContent: "flex-end"}}>
                    <WalletMenu 
                        connected={props.connected}
                        onConnect={props.onConnect}
                        onDisconnect={props.onDisconnect}
                        emitNotification={props.emitNotification}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default Header;