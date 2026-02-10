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

    async getTextContent(selector){
        return await this.page.textContent(selector)
    }

    async waitForSelector(selector, options = {}){
        return await this.page.waitForSelector(selector, {
            state: 'visible',
            timeout: 5000,
            ...options
        })
    }

    async fillInput(selector, value){
        await this.page.fill(selector, value)
    }

    async clickElement(selector){
        await this.page.click(selector)
    }
}