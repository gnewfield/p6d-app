const SUPPORTED_CHAIN_IDS = [
    '43113',    // AVAX Test
    '43114',    // AVAX C
    '80001',    // Polygon Mumbai
    '137',      // Polygon Main
];

const CHAINS = {
    1: {
        walletParams: {
            chainId: "0x1",
            rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/"],
            chainName: "Ethereum Mainnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://etherscan.io/"]
        }
    },
    137: {
        contractAddress: "0x610A95CE2a10825F27690226DA92B0930c844aa1",
        serviceFee: "0.07",
        walletParams: {
            chainId: "0x89",
            rpcUrls: ["https://polygon-rpc.com"],
            chainName: "Polygon Network",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            blockExplorerUrls: ["https://polygonscan.com/"]
        }
    },
    80001: {
        contractAddress: "0x28C227a7Db66517f505A6Cea27f81D6D5a402Ae7",
        serviceFee: "0.07",
        walletParams: {
            chainId: "0x13881",
            rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
            chainName: "Polygon Testnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
        }
    },
    43113: {
        contractAddress: "0x28C227a7Db66517f505A6Cea27f81D6D5a402Ae7",
        serviceFee: "0.0015",
        walletParams: {
            chainId: "0xa869",
            rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
            chainName: "Avalanche Testnet",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18
            },
            blockExplorerUrls: ["https://testnet.snowtrace.io"]
        }
    },
    43114: {
        contractAddress: "0x610A95CE2a10825F27690226DA92B0930c844aa1",
        serviceFee: "0.0015",
        walletParams: {
            chainId: "0xa86a",
            rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
            chainName: "Avalanche Network",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18
            },
            blockExplorerUrls: ["https://snowtrace.io/"]
        }
    },
    1337: {
        walletParams: {
            chainId: "0x539",
            rpcUrls: ["http://127.0.0.1:8545/"],
            chainName: "Local Test Network",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://etherscan.io/"]
        }
    }
}

export const isChainSupported = (chainId) => {
    return SUPPORTED_CHAIN_IDS.includes(chainId.toString());
}

export const getChainParams = (chainId) => {
    return CHAINS[chainId.toString()].walletParams;
}

export const getChainName = (chainId) => {
    return CHAINS[chainId.toString()].walletParams.chainName;
}

export const getHexChainId = (chainId) => {
    return CHAINS[chainId.toString()].walletParams.chainId;
}

export const getContractAddress = (chainId) => {
    return CHAINS[chainId.toString()].contractAddress;
}

export const getServiceFee = (chainId) => {
    return CHAINS[chainId.toString()].serviceFee;
}