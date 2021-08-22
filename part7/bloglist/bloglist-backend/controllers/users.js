const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1 })

  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const password_hash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password_hash
  })

  const savedUser = await user.save()

  response.json(savedUser.toJSON())
})

module.exports = usersRouter