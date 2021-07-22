const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({
      error: 'Malformatted id'
    })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ')
}))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/info', (request, response) => {
  const date = new Date().toLocaleString()
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
  response.send(`<div>
                  <p>Phonebook has info for ${Person.length} people</p>
                </div>
                <div>
                  <p>${date} (${zone})</p>
                </div>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).json({error: 'The person does not exist'})
    }
  }).catch((error) => next(error))
  
  
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end()

  }).catch((error) => next(error))


})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name:body.name,
    number:body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, {new:true}).then(
    updatedInfo => {
      response.json(updatedInfo)
    }
  ).catch((error) => next(error))
})



app.post('/api/persons', (request, response, next) => {
  

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'The name or number is missing'
    })
  }
  Person.find({}).then(result => {
    let i = 0  
    for(i; i < result.length; i++){
      if(body.name === result[i].name && body.number === result[i].number){
        return response.status(400).json({ 
          error: 'The name must be unique'
        })
      }

      else{
        continue  
      }
    }
  })


  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(result => {
    response.json(result)
  }).catch(error => next(error))
})
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on ${PORT}`)