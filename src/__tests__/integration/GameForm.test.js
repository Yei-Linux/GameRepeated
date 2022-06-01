import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ExerciseContext from '../../store/context/Exercise/context'
import GameForm from '../../components/usecases/GameForm'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'

import reduxConfig from '../../store/redux/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { mocks } from '../../constants/settings'

const { persistor, createStore } = reduxConfig
describe('The GameForm component', () => {
  const { numbers } = mocks
  const badSolution = [1, 2, 3, 4, 5]

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
    exercise: numbers,
    type: 'numbers',
    solution: Array.apply(null, new Array(5)).reduce(
      (acc, _, currentIndex) => ({
        ...acc,
        [`${currentIndex}`]: '',
      }),
      {}
    ),
  }
  const propsComponent = {
    props: defaultProps,
    storeValue: values,
    storeEvents: events,
  }

  const component = ({ props, storeValue, storeEvents } = propsComponent) => (
    <Provider store={createStore()}>
      <PersistGate persistor={persistor}>
        <ExerciseContext.Provider value={{ ...storeEvents, ...storeValue }}>
          <GameForm {...props} />
        </ExerciseContext.Provider>
      </PersistGate>
    </Provider>
  )

  const setupComponent = ({
    props,
    storeValue,
    storeEvents,
  } = propsComponent) => render(component({ props, storeValue, storeEvents }))

  describe('Exercise section from GameForm', () => {
    it('Should exercise is displayed with time control', async () => {
      const {
        storeEvents: { setIsVisibleQuestion },
        storeValue: { waitMs },
      } = propsComponent

      const { rerender } = setupComponent()

      const exerciseTitle = screen.queryByText('Read the exercise')
      expect(exerciseTitle).toBeInTheDocument()

      await act(async () => {
        await new Promise((res) =>
          setTimeout(() => {
            res()
          }, waitMs)
        )
      })

      expect(setIsVisibleQuestion).toBeCalledTimes(1)

      rerender(
        component({
          ...propsComponent,
          storeValue: { ...values, isVisibleQuestion: false },
        })
      )

      const exerciseSection = screen.queryByTestId('exercises-container')
      const solutionTitle = screen.queryByText('Set your solution')

      expect(exerciseSection).not.toBeInTheDocument()
      expect(solutionTitle).toBeInTheDocument()
    }, 12000)
  })

  describe('Solution section from GameForm', () => {
    it('Should the solution found is bad and show alert with message', async () => {
      const { setSolution } = events
      const {
        storeValue: { waitMs },
      } = propsComponent

      const alertMock = jest.fn()
      jest.spyOn(window, 'alert').mockImplementation(alertMock)

      const { rerender } = setupComponent()

      await act(async () => {
        await new Promise((res) =>
          setTimeout(() => {
            res()
          }, waitMs)
        )
      })

      rerender(
        component({
          ...propsComponent,
          storeValue: { ...values, isVisibleQuestion: false },
        })
      )

      const postits = screen.queryAllByTestId('postitNotReadonly')

      expect(postits).toHaveLength(5)

      badSolution.map((item, index) => {
        const regexPattern = new RegExp(index, 'i')
        const input = screen.getByRole('textbox', { name: regexPattern })
        userEvent.type(input, `${item}`)
        expect(input).toBeInTheDocument()
      })

      expect(setSolution).toHaveBeenCalledTimes(5)

      rerender(
        component({
          ...propsComponent,
          storeValue: {
            ...values,
            isVisibleQuestion: false,
            solution: badSolution.reduce(
              (acc, currentValue, currentIndex) => ({
                ...acc,
                [`${currentIndex}`]: currentValue,
              }),
              {}
            ),
          },
        })
      )

      const completedButton = screen.queryByText('Completed')
      userEvent.click(completedButton)

      expect(alertMock).toHaveBeenCalledTimes(1)
    }, 13000)
    it('Should solution is displayed ready to complete', async () => {
      const { setSolution } = events
      const {
        storeValue: { waitMs },
      } = propsComponent

      const alertMock = jest.fn()
      jest.spyOn(window, 'alert').mockImplementation(alertMock)

      const { rerender } = setupComponent()

      await act(async () => {
        await new Promise((res) =>
          setTimeout(() => {
            res()
          }, waitMs)
        )
      })

      rerender(
        component({
          ...propsComponent,
          storeValue: { ...values, isVisibleQuestion: false },
        })
      )

      const postits = screen.queryAllByTestId('postitNotReadonly')

      expect(postits).toHaveLength(5)

      numbers.map((item, index) => {
        const regexPattern = new RegExp(index, 'i')
        const input = screen.getByRole('textbox', { name: regexPattern })
        userEvent.type(input, `${item}`)
        expect(input).toBeInTheDocument()
      })

      expect(setSolution).toHaveBeenCalledTimes(5)

      rerender(
        component({
          ...propsComponent,
          storeValue: {
            ...values,
            isVisibleQuestion: false,
            solution: numbers.reduce(
              (acc, currentValue, currentIndex) => ({
                ...acc,
                [`${currentIndex}`]: currentValue,
              }),
              {}
            ),
          },
        })
      )

      const completedButton = screen.queryByText('Completed')
      userEvent.click(completedButton)

      expect(alertMock).toHaveBeenCalledTimes(0)
    }, 13000)
  })
})
