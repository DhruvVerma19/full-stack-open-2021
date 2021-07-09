import React from 'react';

const Header = (props) => {
    return (
    <h2>
      {props.course.name}
    </h2>
      );
  };
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises_num}
      </p>
    );
  };
  
  const Content = (props) => {
    
    return (
      <div>
        {props.course.parts.map(part => <Part key={part.id} name={part.name} exercises_num={part.exercises} />)}
      </div>
    );
  };
  
  const Total = (props) => {
    const parts = props.course.parts.map(course => course.exercises)
  
    return (
      <p> <b>Total of {parts.reduce((s, p) => s + p)} exercises </b></p>
    );
  };
  
  const Course = (props) => {
    return(
      <div>
        <Header course = {props.course} />
        <Content course={props.course} />
        <Total course={props.course} />
      </div>  
    );
  };

export default Course;