import React from "react";

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
      <Part name={props.parts[0].name} exercises_num={props.parts[0].exercises_num} />
      <Part name={props.parts[1].name} exercises_num={props.parts[1].exercises_num} />
      <Part name={props.parts[2].name} exercises_num={props.parts[2].exercises_num} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts[0].exercises_num + props.parts[1].exercises_num + props.parts[2].exercises_num}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises_num: 10,
      },
      {
        name: "Using props to pass data",
        exercises_num: 7,
      },
      {
        name: "State of a component",
        exercises_num: 14,
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;