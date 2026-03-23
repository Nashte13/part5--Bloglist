const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api  = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({username: 'root', passwordHash: 'hashedPassword'})
    await user.save()
})

describe('invalid user creation', () => {
    test('fails if username is missing', async () => {
        const newUser = {name: 'noUsername', password: 'secret'}

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('username and password are required')
    })

    test('fails if password is missing', async () => {
        const newUser = {username: 'nopass', name: 'Nopass'}
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('username and password are required')
    })

    test('fails if username is shorter that 3 chars', async () => {
        const newUser = {username: 'ab', name: 'Short', password: 'secret'}

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('username and password must be atleast 3 characters long')
    })

    test('fails if username already exists', async () => {
        const newUser = {username: 'root', name: 'Duplicate', password: 'secret'}

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('username must be unique')
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})