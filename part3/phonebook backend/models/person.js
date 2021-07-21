const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, 
    useCreateIndex: true }).then(result => {
        console.log('Connected to the Database');
    }).catch((error) => {
        console.log('Error connecting to the database', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
       transform: (document, result) => {
            result.id = result._id.toString()
            delete result._id
            delete result.__v
        }
    })
    
module.exports = mongoose.model('Person', personSchema)