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
        await this.fillInput(this.usernameInput, username)
        await this.fillInput(this.passwordInput, password)
        await this.clickElement(this.loginButton)
    }

    async getErrorText(){
        await this.page.waitForSelector(this.errorMessage)
        return await this.getTextContent(this.errorMessage)
    }
    
    async isErrorVisible(){
        return await this.page.isVisible(this.errorMessage)
    }

    async isOnPostsPage(){
        await this.page.waitForURL('**/posts.html', {timeout: 5000})
        return this.page.url().includes('posts.html')
    }

    async getToken(){
        return await this.page.evaluate(() => localStorage.getItem('token'))
    }
}