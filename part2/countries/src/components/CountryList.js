import React from "react";
import Country from "./Country";

const CountryList = ({ countrieslist }) => {

  const countriesList = countrieslist.map(country => {
    return <div key={country.alpha3Code}>{country.name}</div>;
  });

  if(countrieslist.length > 10){
      return (
          <div>
              <span>Too many matches, specify another filter</span>
          </div>
      );
  }
  else if(countrieslist.length < 10 && countrieslist.length > 1){
        return(
            <div>{countriesList}</div>
        );
  }
  else if(countrieslist.length === 1){
  return (
    <div>
      <Country country={countrieslist[0]} />
    </div>

  )}
  else{
    return null;  
  }
};

export default CountryList;