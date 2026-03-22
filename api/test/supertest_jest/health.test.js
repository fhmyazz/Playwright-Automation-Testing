import request from "supertest"
import app from "../../app.js"

describe("API Health check", () => {
    it("API is Alive", async () => {
        const res = await request(app).get("/posts")

        expect(res.statusCode).toBe(200)
    })
})