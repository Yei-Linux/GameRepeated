import suite from '../../../helpers/suite'

describe('The SuiteHelper', () => {
  it('Should mock operations function', () => {
    const addSpy = jest.spyOn(suite, 'add').mockReturnValue(4)
    const result = suite.operations('suma', 1, 2)

    expect(result).toBe(4)
    addSpy.mockRestore()
  })
  it('Should real operations function', () => {
    const result = suite.operations('suma', 1, 2)

    expect(result).toBe(3)
  })
})
