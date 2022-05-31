import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as createReduxStore,
} from 'redux'
import thunk from 'redux-thunk'
import gameReducer, { gameInitialState } from './reducers/game'
import userReducer, { userInitialState } from './reducers/user'

export const initialState = {
  game: gameInitialState,
  user: userInitialState,
}

export const reducer = combineReducers({ game: gameReducer, user: userReducer })

const middleware = [
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
].filter(Boolean)

const defaultStore = {
  storeReducer: reducer,
  storeInitialState: initialState,
}

const createStore = ({ storeReducer, storeInitialState } = defaultStore) =>
  createReduxStore(storeReducer, storeInitialState, compose(...middleware))

export default createStore
