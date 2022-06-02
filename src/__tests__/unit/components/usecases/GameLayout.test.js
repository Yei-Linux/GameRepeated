import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import GameLayout from '../../../components/usecases/GameLayout'
import { mocks } from '../../../constants/settings'
import ExerciseContext from '../../../store/context/Exercise/context'
import reduxConfig from '../../../store/redux/index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const {
  persistor,
  createStore,
  defaultStore: { storeInitialState },
} = reduxConfig

const { numbers } = mocks

describe('The GameLayout component', () => {
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
          <GameLayout {...props} />
        </ExerciseContext.Provider>
      </PersistGate>
    </Provider>
  )

  const setupComponent = (propsSetup = propsComponent) =>
    render(component(propsSetup))

  beforeEach(() => {})
  it('Should valid initial ui', () => {
    setupComponent({
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

    const gameForm = screen.queryByTestId('game-form')
    const gameSettings = screen.queryByTestId('game-settings')

    expect(gameForm).not.toBeInTheDocument()
    expect(gameSettings).toBeInTheDocument()
  })
  it('Should switch view depending if has started the game or not ', () => {
    setupComponent({
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

    const startGameButton = screen.getByText('Start Game')
    userEvent.click(startGameButton)

    const gameForm = screen.queryByTestId('game-form')
    const gameSettings = screen.queryByTestId('game-settings')

    expect(gameSettings).not.toBeInTheDocument()
    expect(gameForm).toBeInTheDocument()
  })
})
