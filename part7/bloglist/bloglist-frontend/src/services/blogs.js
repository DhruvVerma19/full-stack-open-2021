import axios from 'axios'
const url = '/api/blogs'
import decode from 'jwt-decode'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getUserInfo = () => {
  return token ? decode(token) : false
}

const getAllUsers = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get('/api/users', config)
  return request.then((response) => response.data)
}

const getAll = () => {
  const request = axios.get(url)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(url, newObject, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(
    `${url}/${blog.id}`,
    { likes: blog.likes },
    config
  )
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${url}/${blog.id}`, config)
}

export default {
  getAll,
  create,
  setToken,
  update,
  remove,
  getAllUsers,
  getUserInfo
}
