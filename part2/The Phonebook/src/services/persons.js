import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => {
    const req = axios.get(url);
    return req.then(response => response.data);
}

const create = (person) => {
    const req = axios.post(url, person);
    return req.then(response => response.data);
}

const remove = (id) => {
    const req = axios.delete(`${url}/${id}`)
    return req;
  }
export default {getAll, create, remove};