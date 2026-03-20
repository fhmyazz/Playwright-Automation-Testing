import {test, expect} from "@playwright/test"
import {PostsPage} from "../pages/PostsPage.js"
import { getAuthToken,
         getPostsViaAPI,
         createPostViaAPI,
         deletePostViaAPI
 } from "../helpers/api.helpers.js"

test.describe('Posts Page', () => {
    let postsPage
    let authToken

    test.beforeEach(async ({page, request}) => {
        postsPage = new PostsPage(page)
        authToken = await getAuthToken(request)
        
        // run before page builds
        await page.addInitScript(token => {
            localStorage.setItem('token', token)
        }, authToken)

        await postsPage.goto()
    })

    test('should display post created via API', async ({page, request}) => {
        const payload = {
            author: 'test author',
            title: `test title ${Date.now()}`,
            content: 'test content'
        }
        await createPostViaAPI(request, authToken, payload)

        await page.reload()
        await postsPage.hasPost(payload.title)
    })

    test('should show empty state when no post', async ({page, request}) => {
        const posts = await getPostsViaAPI(request, authToken)

        if(posts.data && posts.data.posts){
            for(const post of posts.data.posts){
                await deletePostViaAPI(request, authToken, post.id)
            }
        }

        await page.reload()
        await expect(postsPage.emptyState).toBeVisible()
    })

    test('should move to Create Post Page', async ({page}) => {
        await postsPage.clickNewPost()

        const createPostText = await page.getByRole('heading', {name: 'Create New Post'})
        await expect(createPostText).toBeVisible()
    })

    test('should move back to Login Page', async ({page}) => {
        await postsPage.logout()

        const loginText = await page.getByRole('heading', {name: 'Login'})
        await expect(loginText).toBeVisible()
    })

})