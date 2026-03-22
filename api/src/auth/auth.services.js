import { findUser, createUser, findUserByUsername, findUserByEmail } from "./auth.db.js"
import { tokenGenerator } from "./token.js"

export function login(username, password){
    let user = findUser(username, password)
    if (!user){ 
        throw new Error("User not found")
    }

    const token = tokenGenerator(user.id)
    return {
        token,
        user: {
            id: user.id,
            username: user.username
        }
    }
}

export function register(username, email, password){
    const existingUsername = findUserByUsername(username)
    if(existingUsername){
        throw new Error("Username already exists")
    }

    const existingEmail = findUserByEmail(email)
    if(existingEmail){
        throw new Error("Email already exists")
    }
    
    const user = createUser(username, email, password)
    const token = tokenGenerator(user.id)
    
    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }
}