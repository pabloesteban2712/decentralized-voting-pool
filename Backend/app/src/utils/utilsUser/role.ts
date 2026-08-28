export async function checkRole (mail: string) {
    if (mail === 'estebangagopablo7@gmail.com') {
        return 1 // Admin
    }
    
    return 2 // Client
}