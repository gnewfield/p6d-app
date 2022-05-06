// Should probably add a nonce, right now time is only thing making difference
const templateFn0 = (login) =>
`p6d.xyz wants you to sign with your account. 
This signature will be used to generate your 
password, which is never sent nor stored. 
Once generated, the password is immediately
copied to your clipboard and ready to use!

Login Details
Name: ${login.tag}
Version: ${login.version}
Date created: ${new Date(login.createdEpoch).toLocaleString()}
Date modified: ${new Date(login.lastModifiedEpoch).toLocaleString()}

Account Details
Ethereum address: ${window.ethereum.selectedAddress.substring(0,5)}...${window.ethereum.selectedAddress.substring(window.ethereum.selectedAddress.length - 4)}
Chain ID: ${parseInt(window.ethereum.chainId)}`;

const templateFn1 = (login) =>
`This is a test ${login.tag}`;

export const templates = [templateFn0, templateFn1];