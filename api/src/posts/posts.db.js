let posts = []
let currentId = 1

export function createPost({ title, content, author }){
    const post = {
        id: currentId++,
        title,
        content,
        author,
        createdAt: new Date().toISOString()
    }
    posts.push(post)
    return post
}

export function getAllPosts(){
    return posts
}

export function getPostById(id){
    // p => alias dari masing-masing posts[index]
    return posts.find(p => p.id === Number(id))
}

export function updatePost(id, data){
    const post = posts.find(p => p.id === Number(id))
    if (!post) return null

    Object.assign(post, data)
    return post
}

export function deletePost(id){
    const pIndex = posts.findIndex(p => p.id === Number(id))
    // findIndex() sudah pasti return -1 jika data tidak ditemukan
    if (pIndex === -1) return false

    posts.splice(pIndex, 1)
    return true
}