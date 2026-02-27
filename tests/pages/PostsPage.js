import { BasePage } from "./BasePage.js"

export class PostsPage extends BasePage{
    constructor(page){
        super(page, '/posts.html')

        this.emptyState = page.getByRole('status')
        this.post = page.getByRole('article')
        this.newPost = page.getByRole('button', {name: 'New Post'})
        this.logout = page.getByRole('button', {name: 'Logout'})
        this.errorText = page.getByRole('alert')
    }

}