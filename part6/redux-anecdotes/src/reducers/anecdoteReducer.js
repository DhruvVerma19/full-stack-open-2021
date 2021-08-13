/* eslint-disable default-case */
import anecdotes from '../services/anecdotes'
import anecdoteService from '../services/anecdotes'
const anecReducer = (state = [], action) => {
  
  switch (action.type) {
    case 'Vote_Inc': {
      return state.map((anecdote) =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    }
    case 'New_Anec': 
      return [...state, action.data]
    
    case 'Init_Anec':
      return action.data
  
    default:
      return state
    
  }
}

export const Vote_Increment = (anecdote) => {
  return async(dispatch)  => {
    await anecdoteService.vote({
      ...anecdote, votes: anecdote.votes + 1
    })
    dispatch({
      type: 'Vote_Inc',
      data: anecdote.id
    })
    
  }
}

export const addAnec = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'New_Anec',
      data: data,
    })
  
  }
}

export const initAnec = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'Init_Anec',
    data: data
    })

  }
}

export default anecReducer