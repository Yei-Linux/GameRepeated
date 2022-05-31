import axios from 'axios'

const axiosRandomApi = axios.create({
  baseURL: 'https://randommer.io',
})

export { axiosRandomApi }
