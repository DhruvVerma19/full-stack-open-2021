import React, { useEffect, useState } from "react";
import PersonsList from "./components/Person";
import PersonForm from "./components/personForm";
import PersonFilter from "./components/personFilter";
import personService from "./services/persons";

const App = () => {
 

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  
  
  useEffect(() => {
      personService.getAll().then(fetchPersons => {
        setPersons(fetchPersons);
      })
  }, []);

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

  const deletePerson = (id) => {
    var del = true;
    personService.remove(id) .catch(err => {
      console.log(err);
      del = false;
    }).finally(() => {
     if(del){
        setPersons(persons.filter(person => person.id !== id))
     }
    })
    
  }

  const handleDelClick = (event) => {
    const id = parseInt(event.target.dataset.id);
    const specificPerson = persons.find(person => person.id === id);
    const delPerson = window.confirm(`Delete ${specificPerson.name}?`);
    if(delPerson){
      deletePerson(id);
    }
  }

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
       personService.create(person).then(setPerson => {
              setPersons(persons.concat(setPerson))
              setNewName('');
              setNewNumber('');
      });
   
    }
     
  }

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
      <PersonsList personslist={filterPersonList} handleDelClick={(event) => handleDelClick(event)}/>
    </div>
  );
};

export default App;