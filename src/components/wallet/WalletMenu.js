import ConnectedWalletMenu from 'components/wallet/ConnectedWalletMenu.js';
import DisconnectedWalletMenu from 'components/wallet/DisconnectedWalletMenu.js';
import { useWeb3React } from '@web3-react/core';

function WalletMenu(props) {
    const { active } = useWeb3React();
    
    let menu;
    if (active && props.connected) {
        menu = <ConnectedWalletMenu onDisconnect={props.onDisconnect} emitNotification={props.emitNotification}/>;
    } else {
        menu = <DisconnectedWalletMenu onConnect={props.onConnect} emitNotification={props.emitNotification}/>
    }
    return menu;
}

export default WalletMenu;