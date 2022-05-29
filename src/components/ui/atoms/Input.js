import classNames from "classnames";
import React from "react";

const Input = ({
  border = true,
  onFocus,
  onBlur,
  variation = "primary",
  name,
  defaultValue,
  onChange,
  placeholder,
  css,
  className,
  borderRadius = 1,
  padding = 1,
  onClick,
}) => {
  return (
    <input
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
      type="text"
      autoComplete="off"
      onChange={onChange}
      placeholder={placeholder}
      style={css}
      className={classNames(
        className,
        "input",
        `input--${variation}`,
        `input--border${borderRadius}`,
        `input--pd${padding}`,
        {
          "input--bordernone": !border,
        }
      )}
      name={name}
      value={defaultValue}
    />
  );
};

export default Input;
