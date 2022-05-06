import Login from 'model/Login.js';
import { encrypt, decrypt } from 'utils/encryption';

class Vault {
    l;
    c;

    constructor(logins) {
        this.l = logins;
        this.c = Date.now();
    }

    get logins() {
        return this.l;
    }

    get createdEpoch() {
        return this.c;
    }

    encrypt(encryptionPublicKey) {
        const serializedVault = JSON.stringify(this, (key, value) => key === "p" ? undefined : value);
        const encryptedVault = encrypt(serializedVault, encryptionPublicKey);
        return encryptedVault;
    }

    static async decrypt(encryptedVault) {
        const decryptedVault = await decrypt(encryptedVault);
        const vault = JSON.parse(decryptedVault);
        const logins = vault.l.map(login => Object.assign(new Login, login));
        return Object.assign(new Vault, {...vault, l: logins});
    }
}

export default Vault;