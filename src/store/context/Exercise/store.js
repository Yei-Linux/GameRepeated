import { useReducer } from "react";
import ExerciseContext from "./context";
import { exerciseReducer } from "./reducer";
import {
  SET_EXERCISE,
  SET_EXERCISE_TYPE,
  SET_IS_VISIBLE_QUESTION,
  SET_SOLUTION,
  SET_WAITMS,
} from "./types";

const ExerciseStore = ({ children }) => {
  const initialState = {
    isVisibleQuestion: true,
    waitMs: 5000,
    exercise: [],
    type: "numbers",
    solution: Array.apply(null, new Array(5)).reduce(
      (acc, _, currentIndex) => ({
        ...acc,
        [`${currentIndex}`]: "",
      }),
      {}
    ),
  };

  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  const setExercise = (payload) => {
    dispatch({
      type: SET_EXERCISE,
      payload,
    });
  };

  const setExerciseType = (payload) => {
    dispatch({
      type: SET_EXERCISE_TYPE,
      payload,
    });
  };

  const setSolution = (value, index) => {
    if (index < 0 && index >= 5) return;

    dispatch({
      type: SET_SOLUTION,
      payload: { value, index },
    });
  };

  const setIsVisibleQuestion = (payload) => {
    dispatch({
      type: SET_IS_VISIBLE_QUESTION,
      payload,
    });
  };

  const setWaitMs = (payload) => {
    dispatch({
      type: SET_WAITMS,
      payload,
    });
  };

  return (
    <ExerciseContext.Provider
      value={{
        waitMs: state.waitMs,
        exercise: state.exercise,
        type: state.type,
        solution: state.solution,
        isVisibleQuestion: state.isVisibleQuestion,
        setExercise,
        setExerciseType,
        setSolution,
        setWaitMs,
        setIsVisibleQuestion,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseStore;
