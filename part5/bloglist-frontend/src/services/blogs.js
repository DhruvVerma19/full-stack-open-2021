import axios from 'axios'
const url = '/api/blogs'

let token = null

const set_token = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = async(obj) => {
  const cfg = {
    headers: {Authorization:token}
  }
  const response = await axios.post(url, obj, cfg)
  return response.data

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, set_token }