import { login, register } from "./auth.services.js"

export function loginController(req, res){
    try{
        const { username, password } = req.body
        if(!username || !password){
            return res.status(400).json({
                success: false,
                error: "Please fill all fields"
            })
        }

        const result = login(username, password)
        return res.status(200).json({
            success: true,
            data: result
        })
    } catch( err ){
        return res.status(401).json({
            success: false,
            error: err.message
        })
    }
}

export function registerController(req, res){
    try{
        const { username, email, password } = req.body
        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                error: "Please fill all fields."
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                success: false,
                error: "Password must be at least 6 characters"
            })
        }

        const result = register(username, email, password)
        return res.status(201).json({
            success: true,
            data: result
        })
    } catch(err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}