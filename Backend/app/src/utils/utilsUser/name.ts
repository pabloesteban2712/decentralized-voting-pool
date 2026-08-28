import { findUsernameDB } from '../../database/userRepository';
import { usernameRow } from '../../entities/types';

export async function checkName(name: string) {
    name = name.trim().toLowerCase()

    let hasNumber: boolean = false

    if (!name) {
        throw new Error("You must introduce a name.")
    }

    if (name.length >= 12) {
        throw new Error("Name is too long.")
    }

    for (let chars of name) {
        if (chars >= "0" && chars <= "9") {
            hasNumber = true;
        }
    }

    if (hasNumber) {
        throw new Error("Name can not contain a number.")
    }

    return name
}

export async function checkUsername(username: string) {
    username = username.trim().toLowerCase()

    if (!username) {
        throw new Error("You must introduce a username.")
    }

    let hasNumber: boolean = false

    for (let chars of username) {
        if (chars >= "0" && chars <= "9") {
            hasNumber = true;
        }
    }

    if (!hasNumber) {
        throw new Error("Username must contain a number.")
    }

    // RECOMENDABLE DIVIDIR LA VALIDACION DE LA COMPROBACION DE BASE DE DATOS
    const existsUsername = await findUsernameDB(username);

    if (existsUsername) {
        throw new Error("User is already registered.")
    } 
    
    return username;
}