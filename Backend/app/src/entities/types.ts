export interface user {
    name: string,
    username: string,
    mail: string,
    passwordHash: string,
    role: number,
}

export type usernameRow = Omit<user, 'name' | 'mail' | 'passwordHash' | 'role' >
export type mailRow = Omit<user, 'name' | 'username' | 'passwordHash' | 'role' >