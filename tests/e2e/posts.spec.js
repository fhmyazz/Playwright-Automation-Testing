import {test, expect} from "@playwright/test"
import { getAuthToken,
         getPostsViaAPI,
         createPostViaAPI,
         deletePostViaAPI
 } from "../helpers/api.helpers.js"

test('test hit API', async ({request}) => {
    const payload = {
        author: 'test author',
        title: 'test title',
        content: 'test content'
    }
    const token = await getAuthToken(request)
    const createPost = await createPostViaAPI(request, token, payload)
    const getPosts = await getPostsViaAPI(request, token)

    if(getPosts.data.posts.length > 0){
        console.log('Terdapat data Post')
        console.log(getPosts)
    }else{
        console.log('Tidak terdapat Posts')
    }
})