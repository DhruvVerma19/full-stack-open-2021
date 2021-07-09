import React from 'react'

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
      <br />
    </div>
  );
};


export default Person