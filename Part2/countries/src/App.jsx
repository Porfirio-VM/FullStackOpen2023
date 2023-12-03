import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import ConditionalRender from "./components/ConditionalRender"


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState()  
  const [countriesToRender, setCountriesToRender] = useState("");

  useEffect(() => {
    if(!countriesToRender){
      axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => setCountries( response.data ) )
    }else{
      axios
      .get(`https://restcountries.com/v3.1/name/${countriesToRender}`)
      .then( response => setCountries( response.data ) )
    }
  },[countriesToRender])

  useEffect(() => {
    const debounce = setTimeout(() => {
      setCountriesToRender(filter)
    }, 400)

    return () => {
      clearTimeout(debounce)
    }
  },[filter])

  const onFilterChange = (e) => setFilter( e.target.value )

  const showCountry = (country) => setCountriesToRender(country) 
 
  return (
    <>
      <Filter onFilterChange={onFilterChange}/>
      <ConditionalRender countries={countries} filter={countriesToRender} showCountry={showCountry} />
    </>
  )
}

export default App
