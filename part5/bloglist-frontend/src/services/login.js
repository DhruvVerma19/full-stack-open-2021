import axios from 'axios'
const url = '/api/login'

const login = async credential => {
    const response = await axios.post(url, credential)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login } 
