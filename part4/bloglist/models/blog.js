const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnInfo) => {
    returnInfo.id = returnInfo._id.toString()
    delete returnInfo._id
    delete returnInfo.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)