import { JsonRpcProvider, Wallet } from 'ethers';

let provider: JsonRpcProvider | undefined;

export const getProvider = () => {
    if (!provider) {
        provider = new JsonRpcProvider(process.env.RPC_URL);
    }

    return provider;
};

export const getSigner = () => {
    return new Wallet(process.env.PRIVATE_KEY!, getProvider());    
};