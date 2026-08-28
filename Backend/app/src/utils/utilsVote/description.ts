export async function checkDescription(description: string) {
    description = description.replace(/\p{Cf}/gu, '') // invisibles
    description = description.normalize('NFC')
    description = description.replace(/\s+/g, ' ').trim()

    if (description.length < 20 || description.length > 500 ) {
        throw new Error("Description must have a certain size.")
    }

    if (/[<>]/.test(description)) {
        throw new Error("Description cannot contain HTML or script content.")
    }

    const realText = description.match(/\p{L}/gu) || []
    
    if (realText.length < 10) {
        throw new Error("Description must contain meaningful text.")
    }

    return description
}
