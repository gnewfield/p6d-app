import { ethers } from 'ethers';
import p6d from 'artifacts/contracts/p6d.sol/p6d.json';
import { getContractAddress, getServiceFee } from 'config/chains';

export async function getVaultPtr() {
    if (typeof window.ethereum === 'undefined') {
        return;
    }    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const chainId = (await provider.getNetwork()).chainId;
    const contractAddress = getContractAddress(chainId);
    const contract = new ethers.Contract(contractAddress, p6d.abi, provider);
    const vaultPtr = await contract.getVaultPtr(window.ethereum.selectedAddress.toString());
    return vaultPtr;
}

export async function updateVaultPtr(ptr) {
    if (typeof window.ethereum === 'undefined') {
        return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const chainId = (await provider.getNetwork()).chainId;
    const contractAddress = getContractAddress(chainId);
    const serviceFee = getServiceFee(chainId);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, p6d.abi, signer);
    const overrides = {value: ethers.utils.parseUnits(serviceFee, "ether")};
    const tx = await contract.updateVaultPtr(ptr, overrides);
    return tx;
}