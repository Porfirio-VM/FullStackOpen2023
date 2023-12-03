import { useEffect, useState } from "react"
import phonebookServices from "./services/phonebook"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Person from "./components/Person"


function App() {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterByName, setFilterByName] = useState('')
  const [notification, setNotification] = useState({value: null, type: null})

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewPhone(e.target.value)
  const handleFilterChange = (e) => setFilterByName(e.target.value)

  useEffect(() => {
    phonebookServices.getAll()
    .then(returnedPerson => {
      setPersons(returnedPerson)
    })
  },[])

  const displayNotification = (notificationObject) =>{
    setNotification(notificationObject)
    const defaultValues = {value: null, type: null}
    setTimeout(() => {
      setNotification(defaultValues)
    },4000)
  }

  const addPerson = (e) =>{
      e.preventDefault();
      const findPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      const newPersonObject = { 
        name: newName, 
        number: newPhone, 
        id: persons.length + 1
      }

      const updatedNumberPerson = {...findPerson, number: newPhone}

      if(findPerson){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          phonebookServices.update(findPerson.id, updatedNumberPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== findPerson.id? person : returnedPerson))
            displayNotification({value: `Phone number replaced`, type: 'success'})
          })
        }
      }else{
          phonebookServices.create(newPersonObject)
          .then(returnedPerson =>  {
            setPersons(persons.concat(returnedPerson))
            displayNotification({value: `Added ${newName}`, type: 'success'})
            })
      }
  }

  const deletePerson = (id) => {
    const phone = persons.find( person => person.id === id )
    if(window.confirm(`Delete ${phone.name}?`)){
      phonebookServices.remove(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {
        displayNotification({value: `information of ${phone.name} has already been removed from server`, type: error})
      })
    }
  }

   const filterPerson =  persons.filter( person => person.name.toLowerCase().includes(filterByName.toLowerCase()) )

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notification.value} type={notification.type}/>
      <Filter event={handleFilterChange}/>
      <h2>add a new</h2>
      <Form handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      {
        filterPerson.map( filter => 
          <Person key={filter.id} filter={filter} deletePerson={() => deletePerson(filter.id)} />
        )
      }
    </>
  )
}

export default App
