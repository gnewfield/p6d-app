import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomButton from 'components/general/CustomButton';
import { connectToChain } from 'ethereum/chains';
import { useWeb3React } from '@web3-react/core';

function SelectNetwork(props) {
    const { account } = useWeb3React();

    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' spacing={1}>
            <Grid item>
                <Typography variant='body1'>Supported chains</Typography>
            </Grid>
            <Grid item>
                <CustomButton 
                    style ={{width: '200px'}}
                    onClick={async () => connectToChain(account, 137, props.emitNotification)}
                >
                    Polygon
                </CustomButton>
            </Grid>
            <Grid item>
                <CustomButton 
                    style ={{width: '200px'}}
                    onClick={() => connectToChain(account, 43114, props.emitNotification)}
                >
                    Avalanche
                </CustomButton>
            </Grid>
        </Grid>
    );
}

export default SelectNetwork;