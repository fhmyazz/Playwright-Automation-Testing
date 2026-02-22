import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage{
    constructor(page){
        super(page, '/register.html')

        this.usernameInput = page.getByLabel('Username')
        this.emailInput = page.getByLabel('Email')
        this.passwordInput = page.getByLabel('Password', {exact: true})
        this.confirmPasswordInput = page.getByLabel('Confirm Password')
        this.registerButton = page.getByRole('button', {name: 'Register'})
        this.errorMessage = '#error-message'
        this.successMessage = '#success-message'
    }

    async register(username, email, password, confirmPassword){
        await this.usernameInput.fill(username)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.confirmPasswordInput.fill(confirmPassword)

        await this.registerButton.click()
    }

    async isRegistrationSuccessful(){
        await this.page.waitForURL('**/login.html', {timeout: 5000})
        return this.page.url().includes('login.html')
    }
}