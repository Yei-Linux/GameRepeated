import { render, screen, waitFor } from '@testing-library/react'
import Exercise from '../../../../components/usecases/Exercise'
import ExerciseContext from '../../../../store/context/Exercise/context'
import reduxConfig from '../../../../store/redux'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import axios from 'axios'
import { mocks } from '../../../../constants/settings'
import { axiosRandomApi } from '../../../../settings/axios'
import { wait } from '@testing-library/user-event/dist/utils'

const {
  persistor,
  createStore,
  defaultStore: { storeInitialState },
} = reduxConfig
const { numbers, words, countries, names } = mocks

describe('The Exercise component', () => {
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
    })

    afterEach(() => {
      jest.spyOn(window.Math, 'random').mockRestore()
    })
    it('Should valid render "numbers" readonly postits in exercise', async () => {
      const { setExercise } = events

      const { rerender } = setupComponent({
        ...propsComponent,
        storeRedux: {
          ...storeInitialState,
          game: {
            ...storeInitialState.game,
            type: 'numbers',
          },
        },
        storeValue: {
          ...values,
          exercise: [],
        },
        storeEvents: {
          ...events,
        },
      })

      //This is a good example to example differences between wait and waitFor(replicate error no bad name of service exfetchWordRandom)
      await wait(() => {
        expect(setExercise).toBeCalledTimes(1)
      })

      rerender(
        component({
          ...propsComponent,
          storeRedux: {
            ...storeInitialState,
            game: {
              ...storeInitialState.game,
              type: 'numbers',
            },
          },
          storeValue: {
            ...values,
            exercise: numbers,
          },
        })
      )

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
    })

    it('Should render words postit from exercise', async () => {
      const { setExercise } = events

      const { rerender } = setupComponent({
        ...propsComponent,
        storeRedux: {
          ...storeInitialState,
          game: {
            ...storeInitialState.game,
            type: 'words',
          },
        },
        storeValue: {
          ...values,
          exercise: [],
        },
      })

      await wait(() => expect(setExercise).toBeCalledTimes(1))

      rerender(
        component({
          ...propsComponent,
          storeRedux: {
            ...storeInitialState,
            game: {
              ...storeInitialState.game,
              type: 'words',
            },
          },
          storeValue: {
            ...values,
            exercise: words,
          },
        })
      )

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

      //Another good example between wait and waitFor
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
