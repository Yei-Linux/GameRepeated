import {
  SET_DOWN_MEMORYLEVEL,
  SET_DOWN_RANKING,
  SET_UP_MEMORYLEVEL,
  SET_UP_RANKING,
  SET_USERNAME,
} from '../types'

export const userInitialState = {
  userName: '',
  ranking: null,
  memoryLevel: 1,
}

const userReducer = (state = userInitialState, action) => {
  const { payload, type } = action

  const actions = {
    [SET_USERNAME]: () => ({
      ...state,
      userName: payload,
    }),
    [SET_UP_RANKING]: () => ({
      ...state,
      ranking: state.ranking + payload,
    }),
    [SET_DOWN_RANKING]: () => ({
      ...state,
      ranking: state.ranking - payload,
    }),
    [SET_UP_MEMORYLEVEL]: () => ({
      ...state,
      memoryLevel: state.memoryLevel + payload,
    }),
    [SET_DOWN_MEMORYLEVEL]: () => ({
      ...state,
      memoryLevel: state.memoryLevel - payload,
    }),
  }

  const item = actions[type]

  if (!item) return state

  return item()
}

export default userReducer
