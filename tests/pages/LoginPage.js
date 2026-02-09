export class LoginPage{
    constructor(page){
        this.page = page
        // locators
        this.usernameInput = '#username'
        this.passwordInput = '#password'
        this.loginButton = '#login-button'
        this.errorMessage = '#error-message'
        this.successMessage = '#success-message'
    }

    async goto(){
        await this.page.goto('/login.html')
        // wait for page to be ready!
        await this.page.waitForLoadState('networkidle')
    }

    async login(username, password){
        await this.page.fill(this.usernameInput, username)
        await this.page.fill(this.passwordInput, password)
        await this.page.click(this.loginButton)
    }

    async getErrorText(){
        await this.page.waitForSelector(this.errorMessage, {
            state: 'visible',
            timeout: 5000
        })
        return await this.page.textContent(this.errorMessage)
    }
    
    async isErrorVisible(){
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