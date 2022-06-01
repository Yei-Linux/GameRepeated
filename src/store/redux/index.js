import {
  applyMiddleware,
  compose,
  createStore as createReduxStore,
} from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { gameInitialState } from './reducers/game'
import makeRootReducer from './reducers/makeRootReducers'
import { userInitialState } from './reducers/user'

export const initialState = {
  game: gameInitialState,
  user: userInitialState,
}

export const reducer = makeRootReducer()

const middleware = [
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
].filter(Boolean)

const defaultStore = {
  storeInitialState: initialState,
}

const createStore = ({ storeInitialState } = defaultStore) => {
  return createReduxStore(reducer, storeInitialState, compose(...middleware))
}
const store = createStore()

const persistor = persistStore(store)

const reduxRoot = { store, persistor, createStore, defaultStore }

export default reduxRoot
