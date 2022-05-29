import classNames from "classnames";
import React from "react";

const Link = ({ href, className, text, isUnderline }) => {
  return (
    <a
      href={href}
      className={classNames(className, "link", {
        "link--underline": isUnderline,
      })}
    >
      {text}
    </a>
  );
};

export default Link;
