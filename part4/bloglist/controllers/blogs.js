const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async(request, response) => {
  const token = request.token
  const decoded_token = jwt.verify(token, process.env.SECRET)
  const body = request.body

  const user = await User.findById(decoded_token.id)
  if (!body.title || !body.url){
    return response.status(400).json({ error: 'title or url is missing' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const save_blog = await blog.save()
  user.blogs = user.blogs.concat(save_blog._id)
  await user.save()

  response.json(save_blog.toJSON())
})

blogsRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async(request, response) => {
  const token = request.token
  const decoded_token = jwt.verify(token, process.env.SECRET)

  if (!token || !decoded_token.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const id = request.params.id
  const blog = await Blog.findById(id)
  if (blog.user.toString() === decoded_token.id) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  }
  return response.status(401).json({
    error: 'Unauthorized to access the blog'
  })

})
//Tested with Postman
blogsRouter.put('/:id', middleware.userExtractor, async(request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const update_blog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(update_blog)
})

module.exports = blogsRouter