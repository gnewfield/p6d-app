import { getChainParams } from 'config/chains';
import { expireVault } from 'utils/localStorage';

export const connectToChain = (account, chainId, emitNotification) => {
    const params = getChainParams(chainId);
    window.ethereum
        .request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: params.chainId }],
        })
        .then(() => onSuccess(account, emitNotification))
        .catch((error) => {
            if (error.code === 4902) {
                window.ethereum
                    .request({
                        method: 'wallet_addEthereumChain',
                        params: [params],
                    })
                    .then(() => onSuccess(account, emitNotification))
                    .catch(() => onFailure(emitNotification));
            } else {
                onFailure(emitNotification);
            }
        });
}

function onSuccess(account, emitNotification) {
    expireVault(account); // Prevent cached data from appearing for new network
    emitNotification(8);
}

function onFailure(emitNotification) {
    emitNotification(12);
}

