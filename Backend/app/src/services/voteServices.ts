import { Contract, Interface } from 'ethers';
import poolAbi from '../blockchain/abi/pool.json';
import { getProvider } from '../blockchain/connection';
import { createPoolOnBlockchain } from '../blockchain/poolContract';
import { createVotePoolDB, findVotePoolById } from '../database/voteRepository';
import { checkDescription } from '../utils/utilsVote/description';
import { checkDuration } from '../utils/utilsVote/duration';
import { checkTitle } from '../utils/utilsVote/title';
import { checkVote } from '../utils/utilsVote/vote';

const poolInterface = new Interface(poolAbi);

export const createPool = async (title: string, description: string, duration: number) => {
    const cleanTitle = await checkTitle(title);
    const cleanDescription = await checkDescription(description);
    const cleanDuration = await checkDuration(duration);
    const address = await createPoolOnBlockchain(cleanDuration);
    
    return createVotePoolDB(cleanTitle, cleanDescription, cleanDuration, address);
}

export const prepareVote = async (poolId: string, option: number) => {
    const votePool = await findVotePoolById(poolId);
    if (!votePool) throw new Error('Voting pool not found.');

    const cleanOption = await checkVote(option, 2);
    return {
        transaction: {
            to: votePool.contract_address,
            data: poolInterface.encodeFunctionData('checkVote', [cleanOption]),
        },
    };
}

export const getResults = async (poolId: string) => {
    
    const votePool = await findVotePoolById(poolId);
    if (!votePool) {
        throw new Error('Voting pool not found.');
    }

    const contract = new Contract(votePool.contract_address, poolAbi, getProvider());
    const [option0, option1] = await Promise.all([
        contract.getFunction('getVotes')(0),
        contract.getFunction('getVotes')(1),
    ]);

    return {
        id: votePool.id,
        title: votePool.title,
        description: votePool.description,
        contractAddress: votePool.contract_address,
        results: { option0: option0.toString(), option1: option1.toString() },
    };
}