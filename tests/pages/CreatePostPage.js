import { BasePage } from "./BasePage.js";
import {expect} from "@playwright/test"

export class CreatePostPage extends BasePage{
    constructor(page){
        super(page, 'create-post.html')

        this.titleInput = page.getByLabel('Title')
        this.contentInput = page.getByLabel('Content')
        this.logoutButton = page.getByRole('button', {name: 'Logout'})
        this.newPostButton = page.getByRole('button', {name: 'Create New Post'})
        this.cancelButton = page.getByRole('button', {name: 'Cancel'})
        this.successMessage = page.getByRole('status')
        this.errorMessage = page.getByRole('alert')
    }

    async createNewPost(title, content, author){
        await this.titleInput.fill(title)
        await this.contentInput.fill(content)
        await this.newPostButton.click()
    }

    async hasPost(title){
        const post = this.page.getByText(title)
        return await expect(post).toBeVisible()
    }
}