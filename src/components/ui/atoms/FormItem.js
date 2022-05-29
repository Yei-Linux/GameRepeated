import classNames from "classnames";
import Container from "../layouts/Container";
import Input from "./Input";
import Label from "./Label";

const FormItem = ({
  type = "input",
  classNameInput,
  label = "",
  name,
  onChange,
  value,
}) => {
  const elementTypes = {
    input: Input,
  };

  const Element = elementTypes[type];

  const handleChange = (e) => {
    const valueEvent = e.target.value;
    onChange({
      name,
      value: valueEvent,
    });
  };

  return (
    <Container padding={0}>
      {label && <Label text={`${label}:`} />}
      <Element
        name={name}
        onChange={handleChange}
        defaultValue={value}
        className={classNameInput}
      />
    </Container>
  );
};

export default FormItem;
