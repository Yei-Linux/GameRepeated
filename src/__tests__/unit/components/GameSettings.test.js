import reduxConfig from '../../../store/redux'
import { mocks } from '../../../constants/settings'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import ExerciseContext from '../../../store/context/Exercise/context'
import GameSettings from '../../../components/usecases/GameSettings'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

const {
  persistor,
  createStore,
  defaultStore: { storeInitialState },
} = reduxConfig

const { numbers } = mocks

describe('The GameSettings Component', () => {
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
          <GameSettings {...props} />
        </ExerciseContext.Provider>
      </PersistGate>
    </Provider>
  )

  const setupComponent = (propsSetup = propsComponent) =>
    render(component(propsSetup))

  it('Should execute change time game', () => {
    const { setWaitMs } = events
    const { rerender } = setupComponent({
      ...propsComponent,
      storeRedux: {
        ...storeInitialState,
        game: {
          ...storeInitialState.game,
          type: 'numbers',
          isStartGame: false,
        },
      },
      storeValue: {
        ...values,
        exercise: numbers,
      },
    })

    const gameTimeSelect = screen.getByRole('combobox', { name: /gameTime/i })
    const optionSelected = screen.getByRole('option', { name: '10000' })
    userEvent.selectOptions(gameTimeSelect, optionSelected)

    expect(setWaitMs).toBeCalledTimes(1)

    rerender(
      component({
        ...propsComponent,
        storeRedux: {
          ...storeInitialState,
          game: {
            ...storeInitialState.game,
            type: 'numbers',
            isStartGame: false,
          },
        },
        storeValue: {
          ...values,
          waitMs: '10000',
          exercise: numbers,
        },
      })
    )

    expect(optionSelected.selected).toBe(true)
  })
})
