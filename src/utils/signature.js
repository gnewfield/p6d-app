import { Buffer } from 'buffer';

export async function getPersonalSignature(message) {
    try {
      const from = await getAccount();
      const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;
      // Not sure if password param is needed
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [msg, from],
      });
      return signature;
    } catch (err) {
      console.error(err);
    }
}

async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    return account;
}