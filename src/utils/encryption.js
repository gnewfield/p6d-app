global.Buffer = global.Buffer || require("buffer").Buffer;
const ethUtil = require('ethereumjs-util');
const sigUtil = require('@metamask/eth-sig-util');

export function encrypt(plaintext, encryptionPublicKey) {
    return ethUtil.bufferToHex(
        Buffer.from(
            JSON.stringify(
                sigUtil.encrypt({
                    publicKey: encryptionPublicKey,
                    data: plaintext,
                    version: 'x25519-xsalsa20-poly1305',
    })), 'utf8'));
}

export async function decrypt(ciphertext) {
    let plaintext;
    await window.ethereum
        .request({
            method: 'eth_decrypt',
            params: [ciphertext, window.ethereum.selectedAddress],
        })
        .then((_plaintext) => plaintext = _plaintext)
        .catch((error) => console.log(error.message));
    return plaintext;
}

export async function fetchEncryptionPublicKey() {
    const encryptionPublicKey = await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [window.ethereum.selectedAddress], // you must have access to the specified account
    });
    return encryptionPublicKey;
}