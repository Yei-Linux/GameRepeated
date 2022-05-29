import classNames from "classnames";
import { settings } from "../../constants/settings";
import { useExercise } from "../../hooks/useExercise";
import { useExerciseStore } from "../../hooks/useExerciseStore";
import Container from "../ui/layouts/Container";
import Postit from "./Postit";

const { postitSize } = settings;

const Exercise = () => {
  const { exercise, setExercise, type } = useExerciseStore();

  useExercise({ postitSize, exerciseType: type, done: setExercise });

  return (
    <Container className={classNames("flex", "gap-1", "justify-center")}>
      {exercise &&
        exercise.map((item, index) => <Postit key={index} text={item} />)}
    </Container>
  );
};

export default Exercise;
