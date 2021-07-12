import React from "react";

const Filter = props => {
  return (
    <div>
      <span>find countires </span>
      <input onChange={props.handleFilterChange} value={props.value}></input>
    </div>
  );
};
export default Filter;
