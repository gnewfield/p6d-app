import Chip from '@mui/material/Chip';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { connectToChain } from 'ethereum/chains';
import { getChainName, getHexChainId } from 'config/chains';
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import eth from 'assets/networks/eth.png';
import matic from 'assets/networks/matic.png';
import avax from 'assets/networks/avax.png';
import local from 'assets/networks/local.png';
import 'styles/App.css';

function NetworkMenu(props) {
    const { account, chainId } = useWeb3React();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (toChainId) => {
        if (toChainId !== chainId)
            connectToChain(account, toChainId, props.emitNotification);
        setAnchorEl(null);
    }

    function isConnected(expectedChainId) {
        if (expectedChainId === chainId) {
            return <FiberManualRecordIcon fontSize='small' color='success' style={{marginLeft: '50%'}}/>;
        }
    }
    
    const networkChip =
        <Chip 
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            sx={{width: 1}}
            color='primary' 
            label={getChainName(chainId)} 
            variant='outlined' 
            onClick={handleClick} 
            icon={open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        />

    const networkMenu = 
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{'aria-labelledby': 'basic-button'}}
        >
                {/* <MenuItem onClick={() => handleClose(1)}>
                    <ListItemIcon>
                        <img src={eth} className='network-logo' />
                    </ListItemIcon>
                    <ListItemText>Ethereum</ListItemText>
                    <ListItemIcon>
                        {isConnected(1)}
                    </ListItemIcon>
                </MenuItem> */}
                <MenuItem onClick={() => handleClose(137)}>
                    <ListItemIcon>
                        <img src={matic} className='network-logo' />
                    </ListItemIcon>
                    <ListItemText>Polygon</ListItemText>
                    <ListItemIcon>
                        {isConnected(137)}
                    </ListItemIcon>
                </MenuItem>
                {/* <MenuItem onClick={() => handleClose(80001)}>
                    <ListItemIcon>
                        <img src={matic} className='network-logo' />
                    </ListItemIcon>
                    <ListItemText>Polygon Testnet</ListItemText>
                    <ListItemIcon>
                        {isConnected(80001)}
                    </ListItemIcon>
                </MenuItem> */}
                <MenuItem onClick={() => handleClose(43114)}>
                    <ListItemIcon>
                        <img src={avax} className='network-logo' />
                    </ListItemIcon>
                    <ListItemText>Avalanche</ListItemText>
                    <ListItemIcon>
                        {isConnected(43114)}
                    </ListItemIcon>
                </MenuItem>
                {/* <MenuItem onClick={() => handleClose(43113)}>
                    <ListItemIcon>
                        <img src={avax} className='network-logo' />
                    </ListItemIcon>
                    <ListItemText>Avalanche Testnet</ListItemText>
                    <ListItemIcon>
                        {isConnected(43113)}
                    </ListItemIcon>
                </MenuItem> */}
                {/* <MenuItem onClick={() => handleClose(1337)}>
                    <ListItemIcon>
                        <img src={local} className='network-logo' />
                    </ListItemIcon>
                    <ListItemText>Localhost</ListItemText>
                    <ListItemIcon>
                        {isConnected(1337)}
                    </ListItemIcon>
                </MenuItem> */}
        </Menu>;

    return (
        <div>
            { networkChip }
            { networkMenu }
        </div>
    );
}

export default NetworkMenu;