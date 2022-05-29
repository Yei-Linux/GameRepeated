import classNames from "classnames";
import React from "react";

const Text = ({
  children,
  as = "p",
  weight = 3,
  padding = 0,
  css,
  className,
}) => {
  const Component = as;

  return (
    <Component
      className={classNames(
        className,
        `text--weight${weight}`,
        `text--pd${padding}`
      )}
      style={css}
    >
      {children}
    </Component>
  );
};

export default Text;
