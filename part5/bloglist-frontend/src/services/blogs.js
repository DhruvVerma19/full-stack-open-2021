import axios from 'axios'
const url = '/api/blogs'

let token = null

const set_token = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(url, newObject, config)
  return response.data
}

export default {
  getAll,
  create,
  set_token
}