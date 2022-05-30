import { render, screen } from '@testing-library/react'
import Exercise from '../../../components/usecases/Exercise'
import ExerciseContext from '../../../store/context/Exercise/context'

import '@testing-library/jest-dom/extend-expect'

describe('The Exercise component', () => {
  const testId = 'exercises-container'
  const exercise = [8, 5, 9, 1, 3]
  const exerciseByWords = ['test1', 'test2', 'test3', 'test4', 'test5']

  const defaultProps = {}
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
    exercise,
    type: 'numbers',
    solution: Array.apply(null, new Array(5)).reduce(
      (acc, _, currentIndex) => ({
        ...acc,
        [`${currentIndex}`]: 'abc',
      }),
      {}
    ),
  }
  const propsComponent = {
    props: defaultProps,
    storeValue: values,
    storeEvents: events,
  }

  const setupComponent = ({
    props,
    storeValue,
    storeEvents,
  } = propsComponent) =>
    render(
      <ExerciseContext.Provider value={{ ...storeEvents, ...storeValue }}>
        <Exercise {...props} />
      </ExerciseContext.Provider>
    )

  describe('Exercise Number Type', () => {
    beforeEach(() => {
      const randomSpy = jest.spyOn(window.Math, 'random')
      exercise.map((item) => {
        randomSpy.mockReturnValueOnce(item / 10)
      })

      setupComponent()
    })

    afterEach(() => {
      jest.spyOn(window.Math, 'random').mockRestore()
    })

    it('Should render exercise component', () => {
      const exerciseComponent = screen.getByTestId(testId)

      expect(exerciseComponent).toBeInTheDocument()
    })

    it('Should valid render readonly postits in exercise', () => {
      exercise.map((item) => {
        const readonlyPostitItem = screen.getByText(item)
        expect(readonlyPostitItem).toBeInTheDocument()
      })
    })
  })

  describe('Exercise Word Type', () => {
    beforeEach(() => {
      jest.spyOn(window, 'fetch').mockResolvedValue({
        json: () => new Promise((res) => res(exerciseByWords)),
      })

      setupComponent({
        ...propsComponent,
        storeValue: {
          ...values,
          exercise: exerciseByWords,
          type: 'words',
        },
      })
    })

    it('Should render words postit from exercise', () => {
      exerciseByWords.map((item) => {
        const notReadonlyPostitItem = screen.getByText(item)
        expect(notReadonlyPostitItem).toBeInTheDocument()
      })
    })
  })
})
