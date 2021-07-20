import axios from "axios";

const url = "/api/persons";

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

const update = (id, newDetails) => {
    const req = axios.put(`${url}/${id}`, newDetails);
    return req.then(response => response.data);
} 
export default {getAll, create, remove, update}