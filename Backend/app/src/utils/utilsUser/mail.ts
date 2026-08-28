import { findMailDB } from '../../database/userRepository';

const emailTerm: string[] = ["@yahoo.com", "@outlook.com", "@hotmail.com", "@gmail.com"]; 

export async function checkMail (mail: string) {
    if (!mail) {
        throw new Error("Email is required.")
    }

    mail = mail.trim().toLowerCase()

    const mailDomain = emailTerm.some(domain => mail.endsWith(domain))

    if (!mailDomain) {
        throw new Error("Invalid mail domain")
    }

    const mailStart: string = mail.charAt(0)
    
    if ((mailStart === "@") || (mailStart >= "0" && mailStart <= "9")) {
        throw new Error("You can not start the mail with the domain or a number.")
    }

    const existsMail = await findMailDB(mail);

    if (existsMail) {
        throw new Error("The mail is already used.")
    }
    
    return mail
}