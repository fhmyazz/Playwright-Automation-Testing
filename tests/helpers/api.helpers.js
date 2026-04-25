const BASE_URL = process.env.API_URL || 'http://localhost:3000'

// login and get token
export async function getAuthToken(request) {
    const response = await request.post(`${BASE_URL}/api/auth/login`, {
        data: {
            username: 'admin',
            password: 'admin123'
        }
    })

    const body = await response.json()
    return body.data.token
}

// get post
export async function getPostsViaAPI(request, token){
    const response = await request.get(`${BASE_URL}/api/posts`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
}

// create post
export async function createPostViaAPI(request, token, postData){
    const response = await request.post(`${BASE_URL}/api/posts`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: postData
    })

    return await response.json()
}

export async function updatePostViaAPI(request, token, postId, updatedData){
    const response = await request.patch(`${BASE_URL}/api/posts/${postId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: updatedData
    })

    return await response.json()
}

export async function deletePostViaAPI(request, token, postId){
    const response = await request.delete(`${BASE_URL}/api/posts/${postId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
}