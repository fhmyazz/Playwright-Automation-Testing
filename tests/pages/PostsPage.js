import { BasePage } from "./BasePage.js"
import { expect } from "@playwright/test"

export class PostsPage extends BasePage{
    constructor(page){
        super(page, '/posts.html')

        this.emptyState = page.getByRole('status')
        this.post = page.getByRole('article')
        this.newPostButton = page.getByRole('button', {name: 'New Post'})
        this.logoutButton = page.getByRole('button', {name: 'Logout'})
        this.errorText = page.getByRole('alert')
    }

    async getPostsCount(){
        return await this.post.count()
    }

    async hasPost(title){
        const post = this.page.getByText(title)
        return await expect(post).toBeVisible()
    }

    async clickNewPost(){
        await this.newPostButton.click()
        await this.page.waitForURL('**/create-post.html')
    }

    async logout(){
        await this.logoutButton.click()
        await this.page.waitForURL('**/login.html')
    }
}