import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { mocks } from '../../../constants/settings'
import Home from '../../../pages/Home'
import ExerciseContext from '../../../store/context/Exercise/context'
import reduxConfig from '../../../store/redux'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

const {
  persistor,
  createStore,
  defaultStore: { storeInitialState },
} = reduxConfig
const { numbers } = mocks
describe('The Home page', () => {
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
          <Home {...props} />
        </ExerciseContext.Provider>
      </PersistGate>
    </Provider>
  )

  const setupComponent = (propsSetup = propsComponent) =>
    render(component(propsSetup))
  it('Should apper modal when user is not registered', () => {
    setupComponent({
      ...propsComponent,
      storeRedux: {
        ...storeInitialState,
        user: {
          ...storeInitialState.user,
          userName: '',
        },
      },
    })

    const titleModal = screen.getByText('Set your userName!')
    expect(titleModal).toBeInTheDocument()
  })

  it('Should validate dont allow register userName if input not has correct length', async () => {
    setupComponent({
      ...propsComponent,
      storeRedux: {
        ...storeInitialState,
        user: {
          ...storeInitialState.user,
          userName: '',
        },
      },
    })

    const input = screen.getByRole('textbox', { name: 'userName' })
    userEvent.type(input, 'jesu')

    const button = screen.getByText('Set Username!')
    userEvent.click(button)

    await new Promise((res) => {
      setTimeout(() => {
        res()
      }, 1000)
    })

    const titleModal = screen.getByText('Set your userName!')
    expect(titleModal).toBeInTheDocument()
  })

  it('Should validate dont allow register userName if input is empty', async () => {
    setupComponent({
      ...propsComponent,
      storeRedux: {
        ...storeInitialState,
        user: {
          ...storeInitialState.user,
          userName: '',
        },
      },
    })

    const button = screen.getByText('Set Username!')
    userEvent.click(button)

    await new Promise((res) => {
      setTimeout(() => {
        res()
      }, 1000)
    })

    const titleModal = screen.getByText('Set your userName!')
    expect(titleModal).toBeInTheDocument()
  })

  it('Should validate if allow register unserName if input is valid', async () => {
    setupComponent({
      ...propsComponent,
      storeRedux: {
        ...storeInitialState,
        user: {
          ...storeInitialState.user,
          userName: '',
        },
      },
    })

    const input = screen.getByRole('textbox', { name: 'userName' })
    userEvent.type(input, 'jesusalvan')

    const button = screen.getByText('Set Username!')
    userEvent.click(button)

    const titleModal = await screen.findByText('Set your userName!')
    expect(titleModal).toBeInTheDocument()
  })
})
