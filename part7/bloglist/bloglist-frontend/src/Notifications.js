import React from 'react'

const favorableStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  border: '5px solid green',
  borderRadius: 5,
  padding: '10px',
  marginBottom: '30px'
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  border: '5px solid red',
  borderRadius: 5,
  padding: '10px',
  marginBottom: '30px'
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  else{


    if (message.includes('wrong username or password')){
      return (
        <div style={errorStyle} className="error">
          {message}
        </div>
      )
    }
    else if(message.includes('not added')){
      return (
        <div style={errorStyle} className="error">
          {message}
        </div>
      )
    }
    else {
      return (
        <div style={favorableStyle} className="error">
          {message}
        </div>
      )
    }
  }
}

export default Notification