import {test, expect} from "@playwright/test"
import { CreatePostPage } from "../pages/CreatePostPage.js"
import { getAuthToken } from "../helpers/api.helpers.js"

test.describe('Create Post Page - Positive', () => {
    let createPostPage
    let authToken

    test.beforeEach(async ({page, request}) => {
        createPostPage = new CreatePostPage(page)
        authToken = await getAuthToken(request)

        await page.addInitScript(({token, user}) => {
            localStorage.setItem('token', token)
            localStorage.setItem('username', JSON.stringify(user))
        }, {
            token: authToken,
            user: {username: 'admin'}
        })

        await createPostPage.goto()
    })

    test('should created Post with success message', async ({page}) => {
        const payload = {
            author: 'test author',
            title: `title ${Date.now()}`,
            content: `content ${Date.now()}`
        }
        await createPostPage.createNewPost(payload.title, payload.content)

        await page.waitForURL('**/posts.html')
        await page.reload()
        await createPostPage.hasPost(payload.title)
    })

    test('should move back to Posts Page', async ({page}) => {
        await createPostPage.cancelButton.click()
        await page.waitForURL('**/posts.html')
    })

    test('should move back to Login Page', async ({page}) => {
        await createPostPage.logout()

        const loginText = await page.getByRole('heading', {name: 'Login'})
        await expect(loginText).toBeVisible()
    })
})

test.describe('Create Post Page - Negative', () => {
    let createPostPage
    let authToken

    test.beforeEach(async ({page, request}) => {
        createPostPage = new CreatePostPage(page)
        authToken = await getAuthToken(request)

        await page.addInitScript(token => {
            localStorage.setItem('token', token)
        }, authToken)

        await createPostPage.goto()
    })

    test('should show error with empty fields', async ({page}) => {
        await createPostPage.newPostButton.click()
        await expect(createPostPage.errorMessage).toBeVisible()

        const errorText = (await createPostPage.getErrorText()).trim()
        expect(errorText).toBeTruthy()
        expect(errorText).toBe('Please fill all fields')
    })
})