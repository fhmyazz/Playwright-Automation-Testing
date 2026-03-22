const tokens = new Map()

export const tokenGenerator = (userId) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = `token-${userId}`

    for (let i = 0; i < 5; i ++){
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    tokens.set(userId, result)
    return result
}

export function verifyToken(token){
    if(!token) return null
    if(!token.startsWith("token-")) return null

    for(const savedToken of tokens.values())
        if (savedToken === token){
            return true
        }
    return false
}