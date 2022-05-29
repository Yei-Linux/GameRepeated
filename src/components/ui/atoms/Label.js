import classNames from "classnames";
import React from "react";

const Label = ({ text, className, css }) => {
  return (
    <label style={css} className={classNames("label", className)}>
      {text}
    </label>
  );
};

export default Label;
