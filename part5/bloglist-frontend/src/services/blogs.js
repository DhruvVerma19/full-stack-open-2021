import axios from 'axios'
const url = '/api/blogs'

let token = null

const set_token = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(url)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const cfg = {
    headers: { Authorization: token },
  }

  const response = await axios.post(url, newObject, cfg)
  return response.data
}

const update = async (blog) => {
  const cfg = {
    headers: { Authorization: token },
  }

  const response = await axios.put(
    `${url}/${blog.id}`,
    { likes: blog.likes },
    cfg
  )
  return response.data
}

const remove = async (blog) => {
  const cfg = {
    headers: { Authorization: token },
  }

  await axios.delete(`${url}/${blog.id}`, cfg)
}

export default {
  getAll,
  create,
  set_token,
  update,
  remove,
}
