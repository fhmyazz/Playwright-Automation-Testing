import request from "supertest"
import app from "../../app.js"

let createdPostId
let invalidToken
let token

describe("POST Test - Positive Case", () => {
    beforeAll(async() => {
        const payload = {
            username: "admin",
            password: "admin123"
        }
        const res = await request(app)
            .post("/login")
            .send(payload)
        token = `${res.body.token}`
    })
    
    it("Create Post - Success", async () => {
        const payload = {
                title: "Article 1",
                author: "Penulis 1",
                content: "Isi artikel 1"
        }

        const res = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${token}`)
            .send(payload)

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty("id")

        createdPostId = res.body.id
    })

    it("Get All Posts", async () => {
        const res = await request(app)
            .get("/posts")
        
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    it("Get post by ID", async () => {
        const res = await request(app)
            .get(`/posts/${createdPostId}`)
            .set("Authorization", `Bearer ${token}`)            

        expect(res.statusCode).toBe(200)
        expect(res.body.id).toBe(createdPostId)
    })

    it("Update post by ID", async () => {
        const payload = {
                title: "ganti judul"
        }

        const res = await request(app)
            .patch(`/posts/${createdPostId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(payload)

        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(payload.title)
    })

    it("Delete post by ID", async () => {
        const res = await request(app)
            .delete(`/posts/${createdPostId}`)
            .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBeDefined()
    })
})

describe("Post - Negative", () => {
    beforeAll(async() => {
        const payload = {
            username: "admin",
            password: "admin123"
        }

        const res = await request(app)
            .post("/login")
            .send(payload)

        token = `${res.body.token}`
        invalidToken = `${res.body.token}_abc`
    })

    it("Posts - without token", async () => {
        const payload = {
            title: "judul post",
            content: "isi post",
            author: "penulis" 
        }
        const res = await request(app)
            .post("/posts")
            .send(payload)
            
        expect(res.statusCode).toBe(401)
        expect(res.body.message).toMatch(/Authorization|token/i)
    })

    it("Posts - invalid token", async () => {
        const payload = {
            title: "judul post",
            content: "isi post",
            author: "penulis" 
        }
        const res = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(payload)
        
        expect(res.statusCode).toBe(401)
    })

    it("POST /posts - title is missing", async () => {
        const res = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                content: "isi",
                author: "penulis"
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.message).toBeDefined()
    })

    it("GET /posts/:id - post not found", async () =>{
        const res = await request(app)
            .get("/posts/9999")
            .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.message).toMatch(/tidak ditemukan/i)
    })

    it("PATCH /posts/:id - post not found", async () => {
        const res = await request(app)
            .patch("/posts/9999")
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "judul"})

        expect(res.statusCode).toBe(404)
        expect(res.body.message).toMatch(/tidak ditemukan/i)
    })

    it("DELETE /posts/:id - post not found", async () => {
        const res = await request(app)
            .delete("/posts/9999")
            .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.message).toMatch(/tidak ditemukan/i)
    })
})