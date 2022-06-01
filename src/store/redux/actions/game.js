import {
  GAME_SET_DOWN_STREAKS,
  GAME_SET_TOGGLE_STARTGAME,
  GAME_SET_TYPE,
  GAME_SET_UP_STREAKS,
} from '../types'

export const setToggleStartGame = (payload) => ({
  type: GAME_SET_TOGGLE_STARTGAME,
  payload,
})

export const setGameType = (gameType) => ({
  type: GAME_SET_TYPE,
  payload: gameType,
})

export const setUpStreaksGame = (streakPoint) => ({
  type: GAME_SET_UP_STREAKS,
  payload: streakPoint,
})

export const setDownStreaksGame = (streakPoint) => ({
  type: GAME_SET_DOWN_STREAKS,
  payload: streakPoint,
})
