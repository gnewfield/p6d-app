import { GET_VAULT_ENDPOINT, ADD_VAULT_ENDPOINT, UNPIN_VAULT_ENDPOINT } from 'config';
import axios from 'axios';

export async function getVault(path) {
    const response = await axios.post(GET_VAULT_ENDPOINT, {path: path});
    const vault = response.data;
    return vault;
}

export async function addVault(vault) {
    const response = await axios.post(ADD_VAULT_ENDPOINT, {file: vault});
    const path = response.data.Name;
    return path;
} 

export async function unpinVault(path) {
    const response = await axios.post(UNPIN_VAULT_ENDPOINT, {path: path});
    const pins = response.data.Pins;
    return pins;
}