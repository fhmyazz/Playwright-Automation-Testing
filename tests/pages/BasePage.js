export class BasePage{
    constructor(page, url){
        this.page = page
        this.url = url
    }

    async goto(){
        await this.page.goto(this.url)
        await this.page.waitForLoadState('domcontentloaded')
    }

    getCurrentURL(){
        return this.page.url()
    }

    async isVisible(selector){
        try{
            return await this.page.isVisible(selector)
        }catch(error){
            return false
        }
    }

    async waitForSelector(selector, options = {}){
        return await this.page.waitForSelector(selector, {
            state: 'visible',
            timeout: 5000,
            ...options
        })
    }

    async getErrorText(){
        // await expect(this.errorMessage).toBeVisible()
        return await this.errorMessage.textContent()
    }

    async getSuccessText(){
        // await expect(this.successMessage).toBeVisible()
        return await this.successMessage.textContent()
    }
    
    async getToken(){
        return await this.page.evaluate(() => localStorage.getItem('token'))
    }

    async logout(){
        await this.logoutButton.click()
        await this.page.waitForURL('**/login.html')
    }
}