const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://dhruvVerma:${password}@cluster0.an8ct.mongodb.net/Phonebook_backend?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const genId = () => {
   
    const id = Math.floor(Math.random()*1000);
    
    return id;
  }

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
    const personName = process.argv[3]
    const personNumber = process.argv[4]
    const person = new Person({
        id:genId(),
        name: personName,
        number: personNumber
    })

    person.save().then(result => {
        console.log(`Added ${personName} number ${personNumber} to phonebook!`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => console.log(person.name, person.number))
        mongoose.connection.close()
    })
}