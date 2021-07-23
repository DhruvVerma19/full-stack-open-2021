const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  jest.setTimeout(30000)

  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogInfo = new Blog(blog)
    await blogInfo.save()
  }
})

test('blogs are returned as json', async() => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})