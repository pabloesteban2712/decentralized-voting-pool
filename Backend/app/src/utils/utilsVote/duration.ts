export async function checkDuration(duration:number) {
    
    const MIN_DURATION = 3600        // 1 hour
    const MAX_DURATION = 2592000    // 30 days

    if (!Number.isInteger(duration)) {
        throw new Error("Duration must be a integer.") 
    }

    if (!Number.isFinite(duration) || duration <= 0) {
        throw new Error("Duration must be a positive valid number.")
    }

    if (duration < MIN_DURATION || duration > MAX_DURATION) {
        throw new Error("Duration must be between 1 hour and 30 days.")
    }

    return duration;
}