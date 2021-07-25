const loginRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const correct_password = user === null
    ? false
    : await bcrypt.compare(body.password, user.hashed_password)

  if (!(user && correct_password)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const user_token = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(user_token, process.env.SECRET)

  response
    .status(200)
    .json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter