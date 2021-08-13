import React from 'react'
import { connect } from 'react-redux'
import { addAnec } from '../reducers/anecdoteReducer'
import { VisibleNotify } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const createAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnec(content)
    props.VisibleNotify(`You created '${content}'`, 4)
    
  }
  

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default connect(null, {addAnec, VisibleNotify})(AnecdoteForm)