import axios from "axios"
import { useEffect, useState } from "react"


const WheaterData = ({ country }) =>{
    const [wheaterData, setWheaterData] = useState()
    const apiKey = import.meta.env.VITE_COUNTRY_API_KEY; //Your API Key here...
    

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country}`)
        .then(response => {
            const wheater = response.data
            setWheaterData(wheater.current)
        })
    }, [country])

    return(
        <>
            {
                wheaterData? 
                (
                    <>
                      <h1>Wheater in {country}</h1>
                      <p><strong>temperature: </strong>{wheaterData.temperature} Celcius</p>
                      {
                        Object.values(wheaterData.weather_icons).map( (icon, index) => <img key={index} src={icon} />)
                      }
                      <p><strong>Wind: </strong>{wheaterData.wind_speed} mph direction {wheaterData.wind_dir}</p>
                    </>
                ):
                (
                    <p>Loading wheater data</p>
                )
            }
        </>
    )
}

export default WheaterData