import { BasePage } from "./BasePage.js"

export class LoginPage extends BasePage{
    constructor(page){
        super(page, '/login.html')
        // locators
        this.usernameInput = '#username'
        this.passwordInput = '#password'
        this.loginButton = '#login-button'
        this.errorMessage = '#error-message'
        this.successMessage = '#success-message'
    }

    async login(username, password){
        await this.page.getByLabel('Username').fill(username)
        await this.page.getByLabel('Password').fill(password)
        await this.page.getByRole('button', {name: 'Login'}).click()
    }

    async getErrorText(){
        await this.page.waitForSelector(this.errorMessage)
        return await this.page.textContent(this.errorMessage)
    }

    async isOnPostsPage(){
        await this.page.waitForURL('**/posts.html', {timeout: 5000})
        return this.page.url().includes('posts.html')
    }

    async getToken(){
        return await this.page.evaluate(() => localStorage.getItem('token'))
    }
}