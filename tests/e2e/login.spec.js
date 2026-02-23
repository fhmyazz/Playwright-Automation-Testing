import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'

test.describe('Login Page - Positive Case', () => {
    let loginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goto()
    })

    test('should login successfully with valid credentials', async ({page}) => {
        const username = 'admin'
        const password = 'admin123'

        await loginPage.login(username, password)

        const isOnPosts = await loginPage.isOnPostsPage()
        expect(isOnPosts).toBe(true)

        const token = await loginPage.getToken()
        expect(token).toBeTruthy()
        expect(token).toMatch(/^[A-Za-z0-9-_]+$/)

        expect(page.url()).toContain('posts.html')
    })

    test('check if login button disable after clicked', async ({page}) => {
        await page.fill('#username', 'admin')
        await page.fill('#password', 'admin123')

        // click button without waiting for navigation
        // if it's not in var, it'll wait to nav
        const loginPromise = await page.click('#login-button')

        // check disabled button
        await expect(page.locator('#login-button')).toBeDisabled()

        // now nav after login button
        await loginPromise
        await page.waitForURL('**/posts.html')
    })
})

test.describe('Login Page - Negative Case', () => {
    let loginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goto()
    })

    test('should show error with empty username', async ({page}) => {
        const password = 'admin123'

        await loginPage.login('', password)
        await expect (loginPage.errorMessage).toBeVisible()

        const errorText = await loginPage.getErrorText()
        expect(errorText).toBeTruthy()
        expect(errorText).toContain('Please fill')
    })

    test('should show error with empty fields', async ({page}) => {
        await loginPage.login('', '')
        await expect (loginPage.errorMessage).toBeVisible()

        const errorText = (await loginPage.getErrorText()).trim()
        expect(errorText).toBeTruthy()
        expect(errorText).toBe('Please fill all fields')
    })

    test('check login using non-existing user', async ({page}) => {
        const username = 'admin'
        const password = 'wrongpassword'
    
        await loginPage.login(username, password)
        await expect (loginPage.errorMessage).toBeVisible()

        const errorText = await loginPage.getErrorText()
        expect(errorText).toMatch(/user not found/i)
    
        expect(page.url()).toContain('login.html')
    })

})