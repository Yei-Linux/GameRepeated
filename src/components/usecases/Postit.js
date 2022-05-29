import { Fragment } from "react";
import classNames from "classnames";
import Container from "../ui/layouts/Container";
import FormItem from "../ui/atoms/FormItem";
import { useExerciseStore } from "../../hooks/useExerciseStore";

const Postit = ({ text, theme = "primary", readonly = true, name }) => {
  const { solution, setSolution } = useExerciseStore();

  return (
    <Fragment>
      {readonly && text !== undefined && (
        <Container
          className={classNames(
            "postit",
            "postit--dimensions",
            `postit--${theme}`
          )}
        >
          {text}
        </Container>
      )}
      {!readonly && (
        <FormItem
          value={solution[name]}
          name={name}
          onChange={({value}) => {setSolution(value,name)}}
          classNameInput={classNames(
            "postit--dimensions",
            "postit__inputnumber--dimensions"
          )}
        />
      )}
    </Fragment>
  );
};

export default Postit;
