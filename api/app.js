import express from "express"
import cors from "cors"
import { loginController, registerController } from "./src/auth/auth.controllers.js"
import {
    createPostController,
    getAllPostController,
    getPostController,
    updatePostController,
    deletePostController
} from "./src/posts/posts.controllers.js"
import { authMiddleware } from "./src/auth/auth.middleware.js"

const app = express()
app.use(cors())
app.use(express.json())

// auth
app.post("/api/auth/login", loginController)
app.post("/api/auth/register", registerController)

// posts
app.get("/api/posts/", authMiddleware, getAllPostController)
app.get("/api/posts/:id", authMiddleware, getPostController)
app.post("/api/posts", authMiddleware, createPostController)
app.patch("/api/posts/:id", authMiddleware, updatePostController)
app.delete("/api/posts/:id", authMiddleware, deletePostController)

export default app