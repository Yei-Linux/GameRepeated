import { useContext } from "react";
import ExerciseContext from "../store/context/Exercise/context";

export const useExerciseStore = () => {
  const {
    exercise,
    setExercise,
    type,
    setExerciseType,
    solution,
    setSolution,
    waitMs,
    setWaitMs,
    isVisibleQuestion,
    setIsVisibleQuestion,
  } = useContext(ExerciseContext);

  return {
    exercise,
    setExercise,
    type,
    setExerciseType,
    solution,
    setSolution,
    waitMs,
    setWaitMs,
    isVisibleQuestion,
    setIsVisibleQuestion,
  };
};
