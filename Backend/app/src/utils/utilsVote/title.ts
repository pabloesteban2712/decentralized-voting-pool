export async function checkTitle (title: string) {
    
    title = title.replace(/\p{Cf}/gu, '') // invisibles
    title = title.normalize('NFC')
    title = title.replace(/\s+/g, ' ').trim().toLowerCase()

    if (!/^[a-z0-9 ]+$/.test(title)) {
        throw new Error("Invalid characters in title")
    }

    if (title.length <5 || title.length > 100) {
        throw new Error("Title must have a certain size.")
    }

    return title
}