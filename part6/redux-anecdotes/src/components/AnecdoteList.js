import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Vote_Increment } from '../reducers/anecdoteReducer'
import { VisibleNotify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
      const filter = state.filter
      const anecdotes = state.anecdotes
    if (filter === '') return anecdotes

    return anecdotes.filter((anecdote) => anecdote.content.indexOf(filter) > 0)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(Vote_Increment(anecdote.id))
    dispatch(VisibleNotify(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(VisibleNotify(null))
    }, 4000)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1)) &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList