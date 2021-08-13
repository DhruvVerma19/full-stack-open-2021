import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(url)
  return res.data
}

const createNew = async (content) => {
  const obj = { content, votes: 0 }
  const res = await axios.post(url, obj)
  return res.data
}

const vote = async (anecdote) => {
  const res = await axios.patch(`${url}/${anecdote.id}`, anecdote)
  return res.data
}

export default {
  getAll,
  createNew,
  vote
}