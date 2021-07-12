import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [filtered, setFiltered] = useState(false);

  const fetchCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  };
  useEffect(fetchCountries, []);

  const filteredCountries = countries.filter(country => {
    return country.name.toUpperCase().includes(filterCountry.toUpperCase());
  });

  const matchedcountries = filteredCountries.some(country => {
    return country.name.toUpperCase() === filterCountry.toUpperCase();
  });

  var exactFilteredCountries;
  if (matchedcountries) {
    exactFilteredCountries = filteredCountries.filter(country => {
      return country.name.toUpperCase() === filterCountry.toUpperCase();
    });
  }

  const handleFilterChange = (event) => {
    setFilterCountry(event.target.value);

    if (event.target.value === "") {
      setFiltered(false);
    }
    else {
      setFiltered(true);
    }
  };
  
  return (
    
    <div>
      <Filter handleFilterChange={(event) => handleFilterChange(event)} value={filterCountry} />
      {filtered && matchedcountries && (
        <CountryList countrieslist={exactFilteredCountries} />
      )}
      {filtered && !matchedcountries && (
        <CountryList countrieslist={filteredCountries} />
      )}
    </div>
  );
}

export default App;