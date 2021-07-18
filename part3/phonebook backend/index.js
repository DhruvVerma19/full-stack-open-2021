const express = require('express');


let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
const app = express();
app.use(express.json())


app.get('/api/persons', (request, response) => {
 response.json(persons);
})

app.get('/info', (request, response) => {
  const date = new Date().toLocaleString();
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
  response.send(`<div>
                  <p>Phonebook has info for ${persons.length} people</p>
                </div>
                <div>
                  <p>${date} (${zone})</p>
                </div>`);
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const specificPerson = persons.find(person => person.id === id)
  
  if (specificPerson) {
    response.json(specificPerson)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const genId = () => {
  const len = persons.length;
  
  const id = Math.floor(Math.random()*1000);
  
  return id;
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'The name or number is missing'
    })
  }

  const commonName =  persons.find(person => person.name === body.name)
  if(commonName){
    return response.status(400).json({
      error: 'The name must be unique'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: genId()
  }

  persons = persons.concat(person);

  response.json(person);
})

const PORT = 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})