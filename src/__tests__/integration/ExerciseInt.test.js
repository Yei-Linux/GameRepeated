import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import Exercise from '../../components/usecases/Exercise'
import { countriesMock, mocks } from '../../constants/settings'
import { axiosRandomApi } from '../../settings/axios'
import ExerciseStore from '../../store/context/Exercise/store'
import reduxConfig from '../../store/redux'

const {
  persistor,
  createStore,
  defaultStore: { storeInitialState },
} = reduxConfig
const { numbers, words, countries, names } = mocks

describe('The Exercise Integration component', () => {
  const defaultProps = {}

  const propsIntegrationComponent = {
    props: defaultProps,
    storeRedux: storeInitialState,
  }

  const componentIntegration = ({
    props,
    storeRedux,
  } = propsIntegrationComponent) => (
    <Provider store={createStore({ storeInitialState: storeRedux })}>
      <PersistGate persistor={persistor}>
        <ExerciseStore>
          <Exercise {...props} />
        </ExerciseStore>
      </PersistGate>
    </Provider>
  )

  const setupComponentIntegration = (propsSetup = propsIntegrationComponent) =>
    render(componentIntegration(propsSetup))

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
      //Todo: Important difference between: await act or act
      act(() =>
        setupComponentIntegration({
          ...propsIntegrationComponent,
          storeRedux: {
            ...storeInitialState,
            game: {
              ...storeInitialState.game,
              type: 'numbers',
            },
          },
        })
      )

      await waitFor(() => {
        numbers.map((item) => {
          const readonlyPostitItem = screen.getByText(item)
          expect(readonlyPostitItem).toBeInTheDocument()
        })
      })
    })
  })

  describe('Exercise Word Type', () => {
    beforeEach(() => {
      jest.spyOn(window, 'fetch').mockResolvedValue({
        json: () => new Promise((res) => res(words)),
      })
    })

    afterEach(() => {
      jest.spyOn(window, 'fetch').mockRestore()
    })

    it('Should valid render "words" readonly postits in exercise', async () => {
      act(() =>
        setupComponentIntegration({
          ...propsIntegrationComponent,
          storeRedux: {
            ...storeInitialState,
            game: {
              ...storeInitialState.game,
              type: 'words',
            },
          },
        })
      )

      await waitFor(() => {
        words.map((item) => {
          const notReadonlyPostitItem = screen.getByText(item)
          expect(notReadonlyPostitItem).toBeInTheDocument()
        })
      })
    })
  })

  describe('Exercise Country Type', () => {
    beforeEach(() => {
      jest.spyOn(axios, 'get').mockResolvedValue({
        data: { data: countriesMock },
      })
    })

    it('Should valid render "countries" readonly postits in exercise', async () => {
      act(() =>
        setupComponentIntegration({
          ...propsIntegrationComponent,
          storeRedux: {
            ...storeInitialState,
            game: {
              ...storeInitialState.game,
              type: 'countries',
            },
          },
        })
      )

      await waitFor(() => {
        countries.map((country) => {
          const notReadonlyPostitItem = screen.getByText(country)
          expect(notReadonlyPostitItem).toBeInTheDocument()
        })
      })
    })
  })

  describe('Exercise Names Type', () => {
    beforeEach(() => {
      jest.spyOn(axiosRandomApi, 'post').mockResolvedValue({
        data: names,
      })
    })

    it('Should valid render "countries" readonly postits in exercise', async () => {
      act(() =>
        setupComponentIntegration({
          ...propsIntegrationComponent,
          storeRedux: {
            ...storeInitialState,
            game: {
              ...storeInitialState.game,
              type: 'names',
            },
          },
        })
      )

      await waitFor(() => {
        names.map((name) => {
          const notReadonlyPostitItem = screen.getByText(name)
          expect(notReadonlyPostitItem).toBeInTheDocument()
        })
      })
    })
  })
})
