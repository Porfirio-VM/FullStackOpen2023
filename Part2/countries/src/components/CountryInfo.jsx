import WheaterData from "./WheaterData"

const CountryInfo = ({ country }) => {

    const {name, capital, languages, flags} = country[0]

    return(
        <article>
            <h1>{name.common}</h1>
            <p>capital: {capital}</p>
            <h2>Languages</h2>
            <ul>
               {
                    Object.values(languages).map(lang => <li key={lang}>{lang}</li>)
               }
            </ul>
            <img src={flags.png} alt="" />
            <WheaterData country={name.common} />
        </article>
    )
}

export default CountryInfo