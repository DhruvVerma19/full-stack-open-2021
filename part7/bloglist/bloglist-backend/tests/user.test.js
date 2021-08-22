const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const User = require('../models/users')


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const hashed_password = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', hashed_password })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const init_user = await helper.usersInDb()

    const new_user = {
      username: 'usertest',
      name: 'Test Subject One',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(new_user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const end_users = await helper.usersInDb()
    expect(end_users).toHaveLength(init_user.length + 1)

    const usernames = end_users.map(u => u.username)
    expect(usernames).toContain(new_user.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const init_user = await helper.usersInDb()

    const new_user = {
      username: 'root',
      password: 'password'
    }

    const response = await api
      .post('/api/users')
      .send(new_user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('`username` to be unique')

    const end_users = await helper.usersInDb()
    expect(end_users).toHaveLength(init_user.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})