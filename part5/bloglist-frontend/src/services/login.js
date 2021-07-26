import axios from 'axios'
const url = '/api/login'

const login = async(credential) => {
    const response = await axios.post(url, credential)
    return response.data
}

export default { login }