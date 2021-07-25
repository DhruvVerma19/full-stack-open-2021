const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/users')

beforeAll(async() => {
  await User.deleteMany({})
  const user = {
    username: 'test',
    name: 'test user',
    password: 'password'
  }

  await api
    .post('/api/users')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)
})

beforeEach(async () => {

  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('viewing a specific blog', () => {
  test('query if a blog has id or _id', async () => {
    const singleBlog = await helper.blogsInDb()

    expect(singleBlog[0].id).toBeDefined()
    expect(singleBlog[0]._id).toBe(undefined)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const loginUser = {
      username: 'test',
      password: 'password'
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})