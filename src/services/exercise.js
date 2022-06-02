import axios from 'axios'
import { axiosRandomApi } from '../settings/axios'

const fetchWordRandom = async () => {
  try {
    const response = await fetch(
      'https://random-word-api.herokuapp.com/word?number=5'
    )
    const data = await response.json()

    return data
  } catch (error) {
    console.log('Error: ', error.message)
    return []
  }
}

const fetchNames = async () => {
  try {
    const request = new FormData()
    request.append('type', 'firstname')
    request.append('number', '5')
    request.append('X-Requested-With', 'XMLHttpRequest')

    const { data } = await axiosRandomApi.post('/Name', request)

    return data
  } catch (error) {
    console.log('Error: ', error.message)
    return []
  }
}

const fetchCountries = async () => {
  try {
    const {
      data: { data },
    } = await axios.get('http://localhost:3001/gamerepeated/country')

    return data
  } catch (error) {
    console.log('Error: ', error.message)
    return []
  }
}

const exerciseService = { fetchWordRandom, fetchNames, fetchCountries }

export default exerciseService
