import { combineReducers } from 'redux'
import gameReducer from './game'
import userReducer from './user'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export const gameConfig = {
  key: 'game',
  version: 1,
  keyPrefix: '',
  storage,
  blacklist: ['isStartGame'],
}

export const userConfig = {
  key: 'user',
  version: 1,
  keyPrefix: '',
  storage,
  blacklist: ['isStartGame'],
}

const rootConfig = {
  key: 'root',
  timeout: 0,
  version: 1,
  keyPrefix: '',
  storage,
  blacklist: ['game', 'user'],
}

const makeRootReducer = () =>
  persistReducer(
    rootConfig,
    combineReducers({
      game: persistReducer(gameConfig, gameReducer),
      user: persistReducer(userConfig, userReducer),
    })
  )

export default makeRootReducer
