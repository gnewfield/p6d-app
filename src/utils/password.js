import { SIG_LENGTH } from 'config';

export function getPasswordFromSignature(signature, params) {
    if (signature.length != SIG_LENGTH) {
      console.error("Invalid signature");
    }
    // Sig is in hex, so 1 char is 4 bits
    // To generate a 128 bit password, 32 chars are needed
    // Encode before taking susbtring in order to avoid padding (b64 requires a multiple of 3)
    const b64EncodedSignature = hexToB64(signature);
    return b64EncodedSignature.substring(b64EncodedSignature.length - params.length);
}

function hexToB64(hexString) {
    return btoa(hexString.match(/\w{2}/g).map(function(a) {
        return String.fromCharCode(parseInt(a, 16));
    }).join(""));
}