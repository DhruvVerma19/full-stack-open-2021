import React from "react";

const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleFormSubmit}>
        <div>
          name:{" "}
          <input onChange={props.handleNameChange} value={props.nameValue} />
        </div>
        <br />
        <div>
          number:{" "}
          <input
            onChange={props.handleNumberChange} value={props.numberValue} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </div>
    );
};
export default PersonForm;