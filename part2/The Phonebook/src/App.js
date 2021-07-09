import React, { useState } from "react";
import Person from "./components/Person";


const App = () => {
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

  const personsList = filterPersonList.map(person => {
    return <Person key={person.name} name={person.name} number={person.number}/>;
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
      filter shown with:{" "}
      <input onChange={(event) => handleFilterChange(event)} value={nameFilter}/>
      <h2>add a new</h2>
      <form onSubmit={(event) => formSubmit(event)}>
        <div>
          name:{" "}
          <input onChange={(event) => handleNameChange(event)} value={newName} />
        </div>
        <br />
        <div>
          number:{" "}
          <input
            onChange={(event) => handleNumberChange(event)} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsList}
    </div>
  );
};

export default App;