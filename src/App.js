import { Provider } from 'react-redux'
import reduxConfig from './store/redux'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import Home from './pages/Home'
import ExerciseStore from './store/context/Exercise/store'

const { store, persistor } = reduxConfig

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ExerciseStore>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ExerciseStore>
      </PersistGate>
    </Provider>
  )
}

export default App
