import React from 'react'

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
      <br />
    </div>
  );
};

const PersonsList = ({personslist}) => {
  
  const personList = personslist.map(person => {
    return( <Person key={person.name} name={person.name} number={person.number}/>);
    
    });

  return (
      <div>
        {personList}
      </div>
  );
};
export default PersonsList;