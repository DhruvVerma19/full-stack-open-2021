const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')


beforeEach(async () => {
  jest.setTimeout(30000)

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

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const new_blog = {
      title: 'Testing an app',
      author: 'John Doe',
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

  const blog_title = end_blogs.map(t => t.title)
  expect(blog_title).toContain('Testing an app')
})

test('verify if likes property is missing then it defaults to 0', async () => {
  const new_blog = {
    title: 'Testing an app',
    author: 'John Doe',
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
    title: 'Testing an app',
    author: 'John Doe'
  }

  await api
    .post('/api/blogs')
    .send(new_blog)
    .expect(400)

  const end_blogs = await helper.blogsInDb()

  expect(end_blogs).toHaveLength(helper.initialBlogs.length)
})})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const start_blog = await helper.blogsInDb()
    const deleted_blog = start_blog[0]

    await api
      .delete(`/api/blogs/${deleted_blog.id}`)
      .expect(204)

    const end_blogs = await helper.blogsInDb()

    expect(end_blogs).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const blog_title = end_blogs.map(r => r.title)

    expect(blog_title).not.toContain(deleted_blog.title)
  })
})


afterAll(() => {
  mongoose.connection.close()
})