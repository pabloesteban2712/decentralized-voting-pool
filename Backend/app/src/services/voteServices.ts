import { checkTitle } from '../utils/utilsVote/title';
import { checkDescription } from '../utils/utilsVote/description';
import { checkDuration } from '../utils/utilsVote/duration';
import { checkVote } from '../utils/utilsVote/vote';
import { checkuserAlreadyVote } from '../utils/utilsVote/userAlreadyVote';
import { createVotePoolDB } from '../database/voteRepository';
import { createPoolOnBlockchain  } from '../blockchain/poolContract';

export const createPool = async (title: string, description: string, duration: number, vote: number, walletAddress: string) => {
    const cleanTitle           = await checkTitle(title)
    const cleanDescription     = await checkDescription(description)
    const cleanDuration        = await checkDuration(duration)
    const cleanVote            = await checkVote(vote, 0)
    const cleanuserAlreadyVote = await checkuserAlreadyVote(walletAddress)

    const poolId = await createPoolOnBlockchain(cleanDuration, cleanVote, cleanuserAlreadyVote)
    
    await createVotePoolDB(cleanTitle, cleanDescription, cleanDuration, cleanVote, cleanuserAlreadyVote)
}

export const vote = async () => {

}

export const getResults = async () => {

}