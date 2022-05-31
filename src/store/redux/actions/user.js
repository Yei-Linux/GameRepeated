import {
  SET_DOWN_MEMORYLEVEL,
  SET_DOWN_RANKING,
  SET_UP_MEMORYLEVEL,
  SET_UP_RANKING,
  SET_USERNAME,
} from '../types'

export const setUserName = (username) => ({
  type: SET_USERNAME,
  payload: username,
})

export const setUpRanking = (rankingUp) => ({
  type: SET_UP_RANKING,
  payload: rankingUp,
})

export const setDownRanking = (rankingDown) => ({
  type: SET_DOWN_RANKING,
  payload: rankingDown,
})

export const setUpMemoryLevel = (memoryLevelUp) => ({
  type: SET_UP_MEMORYLEVEL,
  payload: memoryLevelUp,
})

export const setDownMemoryLevel = (memoryLevelDown) => ({
  type: SET_DOWN_MEMORYLEVEL,
  payload: memoryLevelDown,
})
