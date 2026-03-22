import request from "supertest"
import app from "../../app.js"

describe("Auth test - Positive Case", () => {
    it("Login - Success", async () => {
        const res = await request(app)
        .post("/login")
        .send({
            username: "admin",
            password: "admin123"
        })

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty("token")
    })
})

describe("Auth Test - Negative Case", () => {
    it("Login - Field is empty", async () => {
        const res = await request(app)
            .post("/login")
            .send({
                username: "admin"
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.message).toMatch(/harus diisi/i)
        expect(res.body).not.toHaveProperty("token")
    })
})