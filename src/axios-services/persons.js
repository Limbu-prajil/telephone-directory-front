import axios from 'axios'
const baseUrl = '/api/persons'

const create = (nameNumber) => {
    return axios.post(baseUrl, nameNumber).then(res => res.data)
  }

const read =  () => {
  return axios.get(baseUrl).then(res => res.data)
}

const update =  (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then(res => res.data)
}

const dilit =  (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
  }
  
const person = { create, read, update, dilit }

export default person;