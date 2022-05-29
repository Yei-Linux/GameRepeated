import React from "react";
import classNames from "classnames";

const Button = ({
  variation = "primary",
  children,
  onClick,
  disable = false,
  type = "button",
  css,
  className,
}) => {
  return (
    <button
      type={type}
      style={css}
      className={classNames(
        className,
        "button",
        `button--${variation}`,
        "button--pd1",
        {
          "button--disable": disable,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
