export const exerciseReducer = (state, action) => {
  const { payload, type } = action;

  const actions = {
    SET_EXERCISE: () => ({
      ...state,
      exercise: payload,
    }),
    SET_EXERCISE_TYPE: () => ({
      ...state,
      type: payload,
    }),
    SET_WAITMS: () => ({
      ...state,
      waitMs: payload,
    }),
    SET_IS_VISIBLE_QUESTION: () => ({
      ...state,
      isVisibleQuestion: payload,
    }),
    SET_SOLUTION: () => {
      const { value, index } = payload;

      return {
        ...state,
        solution: { ...state.solution, [`${index}`]: value },
      };
    },
  };

  return actions[type]();
};
