import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import Topbar from '../../../../../components/ui/layouts/Topbar'
import { mocks } from '../../../../../constants/settings'
import * as toggleHook from '../../../../../hooks/useToggle'
import ExerciseContext from '../../../../../store/context/Exercise/context'
import ExerciseStore from '../../../../../store/context/Exercise/store'
import reduxConfig from '../../../../../store/redux'
const { persistor, createStore } = reduxConfig
const { names } = mocks

describe('The Topbar component', () => {
  describe('Topbar test with mocked context', () => {
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
      exercise: names,
      type: 'names',
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

    const component = ({ props, storeValue, storeEvents } = propsComponent) => (
      <Provider store={createStore()}>
        <PersistGate persistor={persistor}>
          <ExerciseContext.Provider value={{ ...storeEvents, ...storeValue }}>
            <Topbar {...props} />
          </ExerciseContext.Provider>
        </PersistGate>
      </Provider>
    )

    const setupComponent = (propsSetup = propsComponent) =>
      render(component(propsSetup))
    it('Should valid handle select game type', async () => {
      const handleToggleMock = jest.fn((value) => value)
      const spy = jest
        .spyOn(toggleHook, 'useToggle')
        .mockReturnValue({ toggle: false, handleToggle: handleToggleMock })
      setupComponent()

      const gameType = screen.getByRole('combobox', { name: 'gameType' })
      const optionSelected = screen.getByRole('option', { name: /words/i })

      await act(() => {
        userEvent.selectOptions(gameType, optionSelected)
      })

      expect(handleToggleMock).toBeCalledTimes(1)

      spy.mockRestore()
    })
  })

  describe('Topbar test with real context valitading', () => {
    const defaultProps = {}
    const propsComponent = {
      props: defaultProps,
    }
    const component = ({ props } = propsComponent) => (
      <Provider store={createStore()}>
        <PersistGate persistor={persistor}>
          <ExerciseStore>
            <Topbar {...props} />
          </ExerciseStore>
        </PersistGate>
      </Provider>
    )
    const setupComponent = (propsSetup = propsComponent) =>
      render(component(propsSetup))

    it('Should change game Type and appeared modal', async () => {
      setupComponent()

      const gameType = screen.getByRole('combobox', { name: 'gameType' })
      const optionSelected = screen.getByRole('option', { name: /words/i })

      await act(() => {
        userEvent.selectOptions(gameType, optionSelected)
      })
      const modalTitle = screen.queryByText(
        'Are you sure do you want to change the type of game?'
      )

      expect(modalTitle).toBeInTheDocument()
    })

    it('Should accept on modal to change gameType', async () => {
      setupComponent()

      const gameType = screen.getByRole('combobox', { name: 'gameType' })
      const optionSelected = screen.getByRole('option', { name: /words/i })
      userEvent.selectOptions(gameType, optionSelected)

      const changeButton = screen.queryByText('Change!')

      userEvent.click(changeButton)

      await waitFor(() => {
        expect(optionSelected.selected).toBe(true)
      })
    })
  })
})
