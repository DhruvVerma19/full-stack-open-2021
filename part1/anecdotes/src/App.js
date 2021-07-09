import React, { useState } from 'react';

const Button = ({click_event, btn_text}) =>{
  return (
    <button onClick={click_event}> {btn_text} </button>
  );
};

const App = () => {

  const click_event_selector = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const vote_click_event = () => {
    const foo = [...votes];
    foo[selected] += 1;
    setVotes(foo);

    if(votes[selected] >= votes[mostVoted] && votes[selected] !== 0){
      setMostVoted(selected);
    }
  };
  
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Int8Array(7));
  const [mostVoted, setMostVoted] = useState(0);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} 
      has {votes[selected]} votes.</p>
      <br />
      <Button click_event={click_event_selector} btn_text="next anecdote" />
      <Button click_event={vote_click_event} btn_text="vote" />

      <br />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  );
};

export default App;