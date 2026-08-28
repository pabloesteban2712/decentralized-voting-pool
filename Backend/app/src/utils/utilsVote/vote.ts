export async function checkVote(vote:number,VOTE_OPTIONS:number) {

    if (!Number.isInteger(vote)) {
        throw new Error("Vote must be a integer.") 
    }

    if (!Number.isInteger(vote)) {
        throw new Error("Vote must be a valid number.")
    }

    if (vote >= VOTE_OPTIONS) {
        throw new Error("Vote is out of range.")
    }

    return vote;
}