import { render, screen, waitFor } from '@testing-library/react'
import Exercise from '../../../components/usecases/Exercise'
import ExerciseContext from '../../../store/context/Exercise/context'
import reduxConfig from '../../../store/redux'

import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import axios from 'axios'
import { mocks } from '../../../constants/settings'
import { axiosRandomApi } from '../../../settings/axios'

const {
  persistor,
  createStore,
  defaultStore: { storeInitialState },
} = reduxConfig
const { numbers, words, countries, names } = mocks

describe('The Exercise component', () => {
  const testId = 'exercises-container'

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
        [`${currentIndex}`]: 'abc',
      }),
      {}
    ),
  }
  const propsComponent = {
    props: defaultProps,
    storeValue: values,
    storeEvents: events,
    storeRedux: storeInitialState,
  }

  const component = ({
    props,
    storeValue,
    storeEvents,
    storeRedux,
  } = propsComponent) => (
    <Provider store={createStore({ storeInitialState: storeRedux })}>
      <PersistGate persistor={persistor}>
        <ExerciseContext.Provider value={{ ...storeEvents, ...storeValue }}>
          <Exercise {...props} />
        </ExerciseContext.Provider>
      </PersistGate>
    </Provider>
  )

  const setupComponent = (propsSetup = propsComponent) =>
    render(component(propsSetup))

  describe('Exercise Number Type', () => {
    beforeEach(() => {
      const randomSpy = jest.spyOn(window.Math, 'random')
      numbers.map((item) => {
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
      const { setExercise } = events
      expect(setExercise).toBeCalledTimes(1)
      numbers.map((item) => {
        const readonlyPostitItem = screen.getByText(item)
        expect(readonlyPostitItem).toBeInTheDocument()
      })
    })
  })

  describe('Exercise Word Type', () => {
    beforeEach(() => {
      jest.spyOn(window, 'fetch').mockResolvedValue({
        json: () => new Promise((res) => res(words)),
      })

      setupComponent({
        ...propsComponent,
        storeValue: {
          ...values,
          exercise: words,
          type: 'words',
        },
      })
    })

    it('Should render words postit from exercise', () => {
      const { setExercise } = events
      expect(setExercise).toBeCalledTimes(1)
      words.map((item) => {
        const notReadonlyPostitItem = screen.getByText(item)
        expect(notReadonlyPostitItem).toBeInTheDocument()
      })
    })
  })

  describe('Exercise Country Type', () => { 
    beforeEach(() => {
      jest.spyOn(axios, 'get').mockResolvedValue({
        data: { data: countries },
      })
    })

    it('Should render postis with countries on it', async () => {
      const { setExercise } = events
      const { rerender } = setupComponent({
        ...propsComponent,
        storeRedux: {
          ...storeInitialState,
          game: {
            ...storeInitialState.game,
            type: 'countries',
          },
        },
        storeValue: {
          ...values,
          exercise: [],
        },
      })

      await waitFor(() => expect(setExercise).toBeCalledTimes(1))

      rerender(
        component({
          ...propsComponent,
          storeRedux: {
            ...storeInitialState,
            game: {
              ...storeInitialState.game,
              type: 'countries',
            },
          },
          storeValue: {
            ...values,
            exercise: countries,
          },
        })
      )

      countries.map((country) => {
        const notReadonlyPostitItem = screen.getByText(country)
        expect(notReadonlyPostitItem).toBeInTheDocument()
      })
    })
  })

  describe('Exercise Names Type', () => {
    beforeEach(() => {
      jest.spyOn(axiosRandomApi, 'post').mockResolvedValue({
        data: names,
      })
    })

    it('Should render names into postit component', async () => {
      const { setExercise } = events
      const { rerender } = setupComponent({
        ...propsComponent,
        storeRedux: {
          ...storeInitialState,
          game: {
            ...storeInitialState.game,
            type: 'names',
          },
        },
        storeValue: {
          ...values,
          exercise: [],
        },
      })

      expect(axiosRandomApi.post).toHaveBeenCalledTimes(1)
      await waitFor(() => expect(setExercise).toHaveBeenCalledTimes(1))

      rerender(
        component({
          ...propsComponent,
          storeRedux: {
            ...storeInitialState,
            game: {
              ...storeInitialState.game,
              type: 'names',
            },
          },
          storeValue: {
            ...values,
            exercise: names,
          },
        })
      )

      names.map((name) => {
        const notReadonlyPostitItem = screen.getByText(name)
        expect(notReadonlyPostitItem).toBeInTheDocument()
      })
    })
  })
})
