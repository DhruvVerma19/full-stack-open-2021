import React from "react";

const Country = ({ country }) => {
    const countrylanglist = country.languages.map(language => {
        return (
        <li key = {language.iso639_1}>
            {language.name}
            </li>
        );
    });

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
        </div>
    );
};
export default Country;