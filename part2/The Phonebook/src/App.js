import React, { useState } from "react";
import PersonsList from "./components/Person";
import PersonForm from "./components/personForm";
import PersonFilter from "./components/personFilter";

const beginingPersonList = [
  {
    name: "Arto Hellas",
    number: "000-000000"

  },
  
  { name: 'Ada Lovelace',
    number: '39-44-5323523' 
  },
  
  { name: 'Dan Abramov', 
    number: '12-43-234345' 
  },
  
  { name: 'Mary Poppendieck', 
    number: '39-23-6423122' 
}
];

const App = () => {
 

  const [persons, setPersons] = useState(beginingPersonList);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  
  const personName = persons.map(person => {
    return person.name.toLocaleUpperCase();
  });

    const filterPersonList = persons.filter(person => {
    return person.name.toUpperCase().includes(nameFilter.toUpperCase());
  });

  
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const formSubmit = (event) => {
    event.preventDefault();

    if (personName.includes(newName.toLocaleUpperCase())) {
      alert(`${newName} is already added to phonebook.`);
    }
    else {
        const person = {
        name: newName,
        number:newNumber
       };
      setPersons([...persons].concat(person));
      }

     setNewName("");
     setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter handleFilterChange={(event) => handleFilterChange(event)} value = {nameFilter} />
      <h2>add a new</h2>
      <PersonForm 
      nameValue={newName}
      numberValue={newNumber}
      handleFormSubmit={(event) => formSubmit(event)}
      handleNameChange = {(event) => handleNameChange(event)}
      handleNumberChange = {(event) => handleNumberChange(event)}
   
      />
      <h2>Numbers</h2>
      <PersonsList personslist={filterPersonList} />
    </div>
  );
};

export default App;