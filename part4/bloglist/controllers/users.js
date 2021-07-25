const User = require('../models/users')
const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')


usersRouter.get('/', async(request, response) => {
    const users = await User
    .find({}).populate('blogs', { url: 1, title: 1 })

  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async(request, response) => {
  const body = request.body

  const saltRounds = 10
  const hashed_password = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    hashed_password
  })

  const saved_user = await user.save()

  response.json(saved_user.toJSON())
})

module.exports = usersRouter