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

test('query if a blog has id or _id', async() => {
  const single_blog = await helper.blogsInDb()

  expect(single_blog[0].id).toBeDefined()
  expect(single_blog[0]._id).toBe(undefined)
})

test('a valid blog can be added', async() => {
  const new_blog = {
    title: 'Test an app',
    author: 'Jhon Doe',
    url: 'https://fullstackopen.com/',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(new_blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const end_blogs = await helper.blogsInDb()
  expect(end_blogs).toHaveLength(helper.initialBlogs.length + 1)

  const titles = end_blogs.map(t => t.title)
  expect(titles).toContain('Test an app')
})

test('verify if likes property is missing then it defaults to 0', async () => {
  const new_blog = {
    title: 'Test an app',
    author: 'Jhon Doe',
    url: 'https://fullstackopen.com/'
  }

  const response = await api
    .post('/api/blogs')
    .send(new_blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
})

test('blog without url is not added', async () => {
  const new_blog = {
    title: 'Test an app',
    author: 'Jhon Doe'
  }

  await api
    .post('/api/blogs')
    .send(new_blog)
    .expect(400)

  const end_blogs = await helper.blogsInDb()

  expect(end_blogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})