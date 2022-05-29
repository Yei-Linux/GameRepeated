import Container from "../ui/layouts/Container";
import Exercise from "./Exercise";
import Solution from "./Solution";
import Button from "../ui/atoms/Button";
import classNames from "classnames";
import { useExerciseStore } from "../../hooks/useExerciseStore";
import { Fragment, useEffect } from "react";

const GameForm = () => {
  const {
    exercise,
    solution,
    waitMs,
    isVisibleQuestion,
    setIsVisibleQuestion,
  } = useExerciseStore();

  const handleWaitToHideQuestion = () => {
    setTimeout(() => {
      setIsVisibleQuestion(false);
    }, waitMs);
  };

  useEffect(() => {
    handleWaitToHideQuestion();
  }, []);

  const comparison = () => {
    try {
      for (let i = 0; i < exercise.length; i++) {
        const question = exercise[i];
        const value = solution[`${i}`];

        if (value != question) {
          throw new Error("Its incorrect the answer");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCompleted = () => {
    const isValidSolution = Object.entries(solution).every(
      ([key, value]) => value !== ""
    );

    if (!isValidSolution) {
      alert("Its not completed the answer.Please complete your answer.");
      return;
    }

    comparison();
  };

  return (
    <Container>
      {isVisibleQuestion ? (
        <Exercise />
      ) : (
        <Fragment>
          <Solution />
          <Container className={classNames("flex", "justify-center")}>
            <Button onClick={handleCompleted}>Completed</Button>
          </Container>
        </Fragment>
      )}
    </Container>
  );
};

export default GameForm;
