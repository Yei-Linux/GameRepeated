import {
  GAME_SET_TOGGLE_STARTGAME,
  GAME_SET_TYPE,
  GAME_SET_UP_STREAKS,
  GAME_SET_DOWN_STREAKS,
} from '../types'

export const gameInitialState = {
  type: 'numbers',
  isStartGame: false,
  streaks: 0,
}

const gameReducer = (state = gameInitialState, action) => {
  const { payload, type } = action

  const actions = {
    [GAME_SET_TYPE]: () => ({
      ...state,
      type: payload,
    }),
    [GAME_SET_TOGGLE_STARTGAME]: () => ({
      ...state,
      isStartGame: payload !== undefined ? payload : !state.isStartGame,
    }),
    [GAME_SET_UP_STREAKS]: () => ({
      ...state,
      streaks: state.streaks + payload,
    }),
    [GAME_SET_DOWN_STREAKS]: () => ({
      ...state,
      streaks: state.streaks - payload,
    }),
  }

  const item = actions[type]

  if (!item) return state

  return item()
}

export default gameReducer
