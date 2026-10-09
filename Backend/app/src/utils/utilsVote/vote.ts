export async function checkVote(vote:number,VOTE_OPTIONS:number) {

    if (!Number.isInteger(vote)) {
        throw new Error("Vote must be a integer.") 
    }

    if (vote < 0 || vote >= VOTE_OPTIONS) {
        throw new Error("Vote is out of range.")
    }

    return vote;
}
