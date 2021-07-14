import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const Country = ({ country }) => {    
    const countrylanglist = country.languages.map(language => {
        return (
        <li key = {language.iso639_1}>
            {language.name}
            </li>
        );
    });
    const[weather, setWeather] = useState([]);
    useEffect(() => {        

        axios.get('http://api.weatherstack.com/current', {
            params: {
                access_key: 'd41cadf66187b460f88135ef1d1e108d',
                query:country.capital
            }
        }
        ).then(response => {
            const apiResponse = response.data;
            setWeather([apiResponse]);
           // console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);

        }).catch(error => {
            console.log(error);
        })
    });
        console.log(weather[0]);
        if (weather.length > 0) {
            const currentCond = weather[0].current
            return (
              <div>
               <div>
            <h2>
                {country.name}
            </h2>
            </div>
            <div>
                <span>capital {country.capital} </span>
                <br />
                <span>population {country.population}</span>
            </div>
            <div>
            <h3>languages</h3>
                <ul>{countrylanglist}</ul>
            </div>
            <div>
                <img width={"200px"} height={"200px"} src={country.flag} />
            </div>
            <div>
            <h2>Weather in {country.capital}</h2>
       
            </div>
            <div>
                <p>temperature: {currentCond.temperature}° Celcius</p>
                <img src={currentCond.weather_icons[0]} alt="Weather icon"></img>
                <p>wind: {currentCond.wind_speed} mph direction {currentCond.wind_dir}</p>
              </div>
              </div>
            )
          }
        
    return(
        <div>
            <h2>
                {country.name}
            </h2>
            <div>
                <span>capital {country.capital} </span>
                <br />
                <span>population {country.population}</span>
            </div>
            <div>
            <h3>languages</h3>
                <ul>{countrylanglist}</ul>
            </div>
            <div>
                <img width={"200px"} height={"200px"} src={country.flag} />
            </div>
            <div>
            <h2>Weather in {country.capital}</h2>
       
            </div>
           
           
        </div>
    );
};
export default Country;