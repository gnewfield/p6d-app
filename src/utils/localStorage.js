export const getAccountData = (address) => {
    const accountData = window.localStorage.getItem(address.toString());
    return JSON.parse(accountData);
}

export const updateAccountData = (address, updates) => {
    const accountData = getAccountData(address);
    const updatedAccountData = {...accountData, ...updates};
    window.localStorage.setItem(address.toString(), JSON.stringify(updatedAccountData));
}

export const expireVault = (address) => {
    updateAccountData(address, {expiryTime: 0});
}