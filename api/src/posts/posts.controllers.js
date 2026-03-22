import { PostService } from "./posts.services.js";

export function createPostController(req, res){
    try{
        const {title, content, author} = req.body
        if (!title || !content || !author) {
            return res.status(400).json({
                success: false,
                error: "Please fill all fields"
            })
        }
        
        const post = PostService.create(req.body)
        return res.status(201).json({
            success: true,
            data: {post: post}
        })
    } catch (err){
        res.status(404).json({ 
            success: false,
            error: err.message 
        })
    }
}

// express selalu memanggil (req, res) walaupun tidak dieksekusi
export function getAllPostController(req, res){
    res.status(200).json({
        success: true,
        data: {posts: PostService.getAll()}
    })
}

export function getPostController(req, res){
    try {
        const post = PostService.getOne(req.params.id)
        res.status(200).json({
            success: true,
            data: {post: post}
        })
    } catch (err) {
        res.status(404).json({ 
            success: false,
            error: err.message
        })
    }
}

export function updatePostController(req, res){
    try{
        const post = PostService.update(req.params.id, req.body)
        res.status(200).json({
            success: true,
            data: {posts: post}
        })
    }catch(err){
        res.status(404).json({ 
            success: false,
            error: err.message
        })
    }
}

export function deletePostController(req, res){
    try{
        const post = PostService.delete(req.params.id)
        res.status(200).json({
            success: true,
            data: {posts: post}
        })
    }catch(err){
        res.status(404).json({ 
            success: false,
            error: err.message 
        })
    }
}