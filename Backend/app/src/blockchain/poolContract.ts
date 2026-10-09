import { Contract, Interface } from 'ethers';
import factoryAbi from './abi/factory.json';
import { getSigner } from './connection';

export const createPoolOnBlockchain = async (duration: number) => {
    const address = process.env.CONTRACT_ADDRESS!;
    const factory = new Contract(address, factoryAbi, getSigner());
    const tx = await factory.getFunction('createVotingPool')(duration);
    const receipt = await tx.wait();
    if (!receipt) throw new Error('Pool creation failed.');

    const event = new Interface(factoryAbi).parseLog(receipt.logs[0]);
    if (!event) throw new Error('Pool address was not returned by the factory.');

    return event.args.poolAddress as string;
}