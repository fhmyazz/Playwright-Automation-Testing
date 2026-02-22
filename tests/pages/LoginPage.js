import { BasePage } from "./BasePage.js"

export class LoginPage extends BasePage{
    constructor(page){
        super(page, '/login.html')
        // locators
        this.usernameInput = page.getByLabel('Username')
        this.passwordInput = page.getByLabel('Password')
        this.loginButton = page.getByRole('button', {name: 'Login'})
        this.errorMessage = '#error-message'
        this.successMessage = '#success-message'
    }

    async login(username, password){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
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