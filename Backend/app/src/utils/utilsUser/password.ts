import bcrypt from 'bcrypt';

export async function checkPassword (password: string) {
    let hasUppercase: boolean = false
    let hasLowercase: boolean = false
    let hasNumber: boolean = false
    let hasSymbol: boolean = false

    const passwordLength: number = password.length;

    if (passwordLength < 8) {
        throw new Error("Password does not meet security requirements.")
    }

    for (let char of password) {
        if (char >= "A" && char <= "Z") {
            hasUppercase = true }
        else if (char >= "a" && char <= "z") {
            hasLowercase = true }
        else if (char >= "0" && char <= "9") {
            hasNumber = true }
        else {
            hasSymbol = true
        }
    }
    
    if (!(hasUppercase && hasLowercase && hasNumber && hasSymbol)) {
        throw new Error ("Password does not meet security requirements.")
    }
    
    return password
}

export async function hashPassword (password: string) {
    return bcrypt.hash(password, 10) // 10 = salt rounds
}

export async function verifyPassword (password: string, hashedPassword: string): Promise<boolean> {
        if (await bcrypt.compare(password, hashedPassword)) {
            return true
        } else {
            throw new Error ("Invalid password.")
    }
}