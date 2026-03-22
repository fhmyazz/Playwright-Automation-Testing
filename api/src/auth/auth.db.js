const users = [
    { "id": 1, "username": "admin", "email": "admin@mail.com", "password": "admin123"}
]

let userId = 2
export function createUser(username, email, password){
    const user = { id: userId++, username, email, password}
    users.push(user)
    return user
}

export function findUser(username, password){
    return users.find(
        u => u.username === username && u.password === password
    )
}

export function findUserByUsername(username){
    return users.find(
        u => u.username === username
    )
}

export function findUserByEmail(email){
    return users.find(
        u => u.email === email
    )
}