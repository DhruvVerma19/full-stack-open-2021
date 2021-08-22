const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
  useCreateIndex: true }).then(result => {
  console.log('Connected to the Database')
}).catch((error) => {
  console.log('Error connecting to the database', error.message)
})

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: [3, 'Name must contain at least 3 characters'] },
  number: { type: String, required: true, unique: true, minlength: [8, 'The Number must contain at least 8 characters'] }
})

personSchema.set('toJSON', {
  transform: (document, result) => {
    result.id = result._id.toString()
    delete result._id
    delete result.__v
  }
})
personSchema.plugin(validator)

module.exports = mongoose.model('Person', personSchema)