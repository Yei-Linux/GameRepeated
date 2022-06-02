import axios from 'axios'
import exerciseService from '../../../services/exercise'
import { axiosRandomApi } from '../../../settings/axios'

describe('The Exercise Service', () => {
  it('Should fetch word Random', async () => {
    const expected = ['hi', 'whats', 'up', 'bye', 'test']
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: () => new Promise((res) => res(expected)),
    })

    const response = await exerciseService.fetchWordRandom()

    expect(response).toBe(expected)
  })

  it('Should fetch names', async () => {
    const expected = ['jesus', 'cesar', 'alberto', 'arturo', 'test']
    jest.spyOn(axiosRandomApi, 'post').mockResolvedValueOnce({
      data: expected,
    })

    const response = await exerciseService.fetchNames()

    expect(response).toBe(expected)
  })

  it('Should fetch countries', async () => {
    const expected = ['Peru', 'Colombia', 'Chile', 'Mexico', 'Argentina']
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: { data: expected },
    })

    const response = await exerciseService.fetchCountries()

    expect(response).toBe(expected)
  })
})
