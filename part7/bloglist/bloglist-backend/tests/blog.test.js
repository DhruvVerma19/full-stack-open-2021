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
describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const new_blog = {
      title: 'Testing the application',
      author: 'Dhruv Verma',
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
  expect(blog_title).toContain('Testing the application')
})

test('verify if likes property is missing then it defaults to 0', async () => {
  const new_blog = {
    title: 'Testing the application',
    author: 'Dhruv Verma',
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
    title: 'Testing the application',
    author: 'Dhruv Verma'
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
    const user_login = {
      username: 'test',
      password: 'password'
    }

    const loggedin_user = await api
      .post('/api/login')
      .send(user_login)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${loggedin_user.body.token}`)
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