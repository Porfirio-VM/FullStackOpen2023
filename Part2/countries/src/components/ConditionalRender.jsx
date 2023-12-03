import Countries from "./Countries";
import CountryInfo from "./CountryInfo";

const ConditionalRender = ({ countries, filter, showCountry }) => {

  if (filter && countries.length > 10) {
    return <p>More than 10</p>;
  }

  if (filter && countries.length === 1) {
    return <CountryInfo country={countries} />
  }

 return (
      <>
        {countries.map((country) => (
          <Countries key={country.name.common} name={country.name.common} showCountry={showCountry} />
        ))}
      </>
    );
  
};

export default ConditionalRender;
