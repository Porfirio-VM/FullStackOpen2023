
const Person = ({ filter, deletePerson }) =>{
    const {name, number} = filter
    return  <div>{name} {number} <button onClick={deletePerson}>Delete</button></div> 
}

export default Person