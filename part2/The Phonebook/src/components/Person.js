import React from 'react'

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number} <button data-id={props.id} onClick={props.handleDelClick}> Delete</button>
      <br />
    </div>
  );
}; 

const PersonsList = ({personslist, handleDelClick}) => {
  
  const personList = personslist.map(person => {
    return( <Person key={person.name} id={person.id} name={person.name} number={person.number} handleDelClick={handleDelClick} />);
    
    });

  return (
      <div>
        {personList}
      </div>
  );
};
export default PersonsList;