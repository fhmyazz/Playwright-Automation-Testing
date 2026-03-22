# What is this?
This is my personal API project. Focused on learning API Fundamentals, so it could support my transition into Software Development Engineer in Testing (SDET).

## Stack
Since this project is part of my testing journey, i'll keep it simple.
- Node.js
- Express JS
- Supertest
- Jest

## Testing tools
- Postman (Manual Testing + Scripts)
- Supertest (Automated API testing)
- Jest (Assertion)

## Features
- User Login with token-based authentication
- Token-based Authorization to protect endpoints
- CRUD Post API
- Positive and Negative cases
- Automated API testing with assertion using Supertest + Jest

## Endpoints
- POST /login
- POST /posts
- GET /posts/
- GET /posts/:id
- PATCH /posts/:id
- DELETE /posts/:id

## How to?
### Manual Testing => 
- Clone this repository
- Install the dependencies
- Import this into postman `./test/postman/local-login_posts.postman_collection`

### Automation Testing =>
- Clone this repository
- Install the dependencies
- Run this on terminal (project root) `npm test`

## Testing Scope
Positive:
- Login and generate token
- Creating post using token
- Get all post
- Get post by ID using token
- Update post by ID using token
- Delete post by ID using token

Negative:
- Login with empty field
- Creating post without token
- Creating post with invalid token
- Creating post with no title
- Get post by not existed id
- Update post by id not existed id
- Delete post by id not existed id


### Notes: 
- Since it's only in-memory storage, so data won't be exists after server restart
- Token is one-time per login. Re-login will generate a new token