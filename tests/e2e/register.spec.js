import {test, expect} from "@playwright/test"
import { RegisterPage } from "../pages/RegisterPage.js"
import { LoginPage } from "../pages/LoginPage.js"

test.describe('Register Page - Positive Case', () => {
    let registerPage
    let loginPage

    test.beforeEach(async ({page}) => {
        registerPage = new RegisterPage(page)
        loginPage = new LoginPage(page)
        await registerPage.goto()
    })

    test('should registered successfully and login with the user', async ({page}) => {
        let timestamp = Date.now()
        const username = `user_${timestamp}`
        const email = `user_${timestamp}@mail.com`
        const password = `user_${timestamp}`
        const confirmPassword = password

        await registerPage.register(username, email, password, confirmPassword)
        await expect (registerPage.successMessage).toBeVisible()

        let successText = await registerPage.getSuccessText()
        const isRegistered = await registerPage.isRegistrationSuccessful()
        
        expect(successText).toBeTruthy()
        expect(isRegistered).toBe(true)
        expect(page.url()).toContain('login.html')
        
        await loginPage.login(username, password)
        await expect (registerPage.successMessage).toBeVisible()

        successText = await registerPage.getSuccessText()
        const isLogin = await loginPage.isOnPostsPage()
        
        expect(successText).toBeTruthy()
        expect(isLogin).toBe(true)
    })
})

test.describe('Register Page - Negative Case', () => {
    let registerPage

    test.beforeEach(async ({page}) => {
        registerPage = new RegisterPage(page)
        registerPage.goto()
    })

    test('show error when register with empty field', async ({page}) => {
        await registerPage.register('username', '', '', '')
        await expect (registerPage.errorMessage).toBeVisible()

        const errorText = (await registerPage.getErrorText()).trim()
        
        expect(errorText).toBeTruthy()
        expect(errorText).toBe('Please fill all fields.')
    })

    //// can't be tested because type is email (frontend checked).
    // test('show error when email is not valid', async ({page}) => {
    //     await registerPage.register('username', 'email', 'password', 'password')

    //     const errorText = (await registerPage.getErrorText()).trim()

    //     expect(errorText).toBeTruthy()
    //     expect(errorText).toBe('Please use valid email')
    // })

    test('show error when password is less than 6 characters', async ({page}) => {
        await registerPage.register('username', 'mail@mail.com', 'pass', 'pass')
        await expect (registerPage.errorMessage).toBeVisible()

        const errorText = (await registerPage.getErrorText()).trim()

        expect(errorText).toBeTruthy()
        expect(errorText).toBe('Password must be at least 6 characters')
    })

    test('show error when password is not matched', async ({page}) => {
        await registerPage.register('username', 'email@mail.com', 'password', 'failedpassword')
        await expect (registerPage.errorMessage).toBeVisible()

        const errorText = (await registerPage.getErrorText()).trim()

        expect(errorText).toBeTruthy()
        expect(errorText).toBe('Please make sure password is matched')
    })

    test('show error when username is exists', async ({page}) => {
        await registerPage.register('admin', 'mail@mail.com', 'admin123', 'admin123')
        await expect (registerPage.errorMessage).toBeVisible()

        const errorText = (await registerPage.getErrorText()).trim()

        expect(errorText).toBeTruthy()
        expect(errorText).toBe('Username already exists')
    })

    test('show error when email is exists', async ({page}) => {
        await registerPage.register('admin1', 'admin@mail.com', 'admin123', 'admin123')
        await expect (registerPage.errorMessage).toBeVisible()

        const errorText = (await registerPage.getErrorText()).trim()

        expect(errorText).toBeTruthy()
        expect(errorText).toBe('Email already exists')
    })
})