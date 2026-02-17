import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage{
    constructor(page){
        super(page, '/register.html')

        this.username = '#username'
        this.email = '#email'
        this.password = '#password'
        this.confirmPassword = '#confirm-password'
        this.registerButton = '#register-button'
        this.errorMessage = '#error-message'
        this.successMessage = '#success-message'
    }

    async register(username, email, password, confirmPassword){
        await this.fillInput(this.username = username)
        await this.fillInput(this.email = email)
        await this.fillInput(this.password = password)
        await this.fillInput(this.confirmPassword = confirmPassword)

        await this.clickElement(this.registerButton)
    }

    async isRegistrationSucessful(){
        const url = this.getCurrentURL()
        return url.includes('login.html')
    }

    async getErrorText(){
        await this.waitForSelector(this.errorMessage)
        return await this.getTextContent(this.errorMessage)
    }

    async getSuccessText(){
        await this.waitForSelector(this.successMessage)
        return await this.getTextContent(this.successMessage)
    }
}