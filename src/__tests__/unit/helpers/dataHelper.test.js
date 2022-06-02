import dataHelper from '../../../helpers/data'

describe('The Data Helper', () => {
  it('Should return a correct random number', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.5712)

    const response = dataHelper.getRandomNumber()

    expect(response).toBe(6)
  })
})
