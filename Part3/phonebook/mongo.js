const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personPhone = process.argv[4]

const url = `mongodb+srv://porfirio:${password}@fullstackopencluster.yorcbq5.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    phone: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
    Person.find({}).then(result => {
        console.log('Phonebook')
        result.forEach(person => {
            console.log(person.name, person.phone)
        })
        mongoose.connection.close()
    })
}

if(process.argv.length === 5){
    const person = new Person({
        name: personName,
        phone: personPhone
    })

    person.save().then( () => {
        console.log(`Added ${personName} number ${personPhone} to phonebook`)
        mongoose.connection.close()
    })
}

