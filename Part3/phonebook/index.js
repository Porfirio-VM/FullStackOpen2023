const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

morgan.token('req-body', function(request) {
    return  request.method === 'GET'? '' : JSON.stringify(request.body)
})

app.get('/', (request, response) => {
    response.send('<h1>Phonebook Info</h1>')
})

app.get('/api/person',(request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/person/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person){
                response.json(person)
            }else{
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/api/info', (request, response) => {
    Person.find({})
        .then(person => {
            response.send(
                `<p>Phonebook has info for ${person.length}</p>
                 <p>${Date()}</p>`)
        })

})

app.delete('/api/person/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(deletedPerson => {
            if(deletedPerson){
                response.status(204).send('deleted person successfully')
            }else{
                response.status(400).send('person not found')
            }
        })
        .catch(error => next(error))
})

app.put('/api/person/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        phone: body.phone
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true },)
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.post('/api/person', async (request, response, next) => {
    const body = request.body

    if (!body.name || !body.phone) {
        return response.status(400).json({
            error: 'Name or phone is missing'
        })
    }

    const existingPerson = await Person.findOne({ name: body.name })

    if (existingPerson) {
        return response.status(409).json({
            error: 'Name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        phone: body.phone
    })

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedPerson => {
            response.json(savedPerson)
        } )
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {

    console.log(error.message)

    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    }else if(error.name === 'ValidationError'){
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is Running in the port: ${PORT}`)
})