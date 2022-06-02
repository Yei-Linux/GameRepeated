import { render, screen } from '@testing-library/react'
import Postit from '../../../components/usecases/Postit'

import ExerciseContext from '../../../store/context/Exercise/context'
import userEvent from '@testing-library/user-event'

import suite from '../../../helpers/suite'

describe('The Postit component', () => {
  const defaultProps = {
    htmlFor: 'postItElementLabel',
    ariaLabel: 'postItElement',
    text: 'PostIt Component',
    theme: 'primary',
    readonly: true,
    name: '0',
  }

  const events = {
    setExercise: jest.fn(),
    setExerciseType: jest.fn(),
    setSolution: jest.fn(),
    setWaitMs: jest.fn(),
    setIsVisibleQuestion: jest.fn(),
  }
  const values = {
    isVisibleQuestion: true,
    waitMs: 5000,
    exercise: [],
    type: 'numbers',
    solution: Array.apply(null, new Array(5)).reduce(
      (acc, _, currentIndex) => ({
        ...acc,
        [`${currentIndex}`]: 'abc',
      }),
      {}
    ),
  }

  const setupComponent = (props = defaultProps) =>
    render(
      <ExerciseContext.Provider
        value={{
          ...events,
          ...values,
        }}
      >
        <Postit {...props} />
      </ExerciseContext.Provider>
    )

  describe('Postit readonly component', () => {
    it('Should render Postit component of readonly type', () => {
      const { asFragment } = setupComponent()

      expect(asFragment()).toMatchSnapshot()
    })
    it('Should make readonly the postit component', () => {
      const { text } = defaultProps
      setupComponent()

      const postit = screen.getByText(text)

      expect(postit).toHaveClass('postit--readonly')
    })
  })

  describe('Postit not readonly component', () => {
    beforeEach(() => {
      setupComponent({
        ...defaultProps,
        text: undefined,
        readonly: false,
      })
    })

    it('Should render Postit component of not readonly type', () => {
      const { asFragment } = setupComponent({
        ...defaultProps,
        text: undefined,
        readonly: false,
      })

      expect(asFragment()).toMatchSnapshot()
    })

    it('Should render label and input from postit', () => {
      const { htmlFor, ariaLabel } = defaultProps

      const labelPostit = screen.queryByLabelText(htmlFor)
      const inputPostit = screen.getByLabelText(ariaLabel)

      expect(labelPostit).not.toBeInTheDocument()
      expect(inputPostit).toBeInTheDocument()
    })
    it('Should type text solution in postit', async () => {
      const { setSolution } = events
      const { ariaLabel } = defaultProps

      const inputPostit = screen.getByLabelText(ariaLabel)
      await userEvent.type(inputPostit, 'abc')

      expect(setSolution).toBeCalledTimes(3)
      expect(inputPostit).toHaveValue('abc')
    })
    it('Should mock operations function', () => {
      jest.spyOn(suite, 'add').mockReturnValue(3)
      const result = suite.operations('suma', 1, 2)

      expect(result).toBe(3)
    })
  })
})
