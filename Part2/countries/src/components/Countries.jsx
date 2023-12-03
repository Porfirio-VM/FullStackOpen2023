
const Countries = ({ name, showCountry }) =>{
    return(
        <div>{name} <button onClick={() => showCountry(name)}>Show</button></div>
    )
}

export default Countries