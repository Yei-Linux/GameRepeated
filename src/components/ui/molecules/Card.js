import classNames from "classnames";
import React from "react";
import Container from "../../layouts/Container";

const Header = ({ children }) => {
  return <Container>{children}</Container>;
};

const Body = ({ children }) => {
  return <Container>{children}</Container>;
};

const Footer = ({ children }) => {
  return <Container>{children}</Container>;
};

const Card = ({ children, className, testId }) => {
  return (
    <Container testId={testId} className={classNames(className, "card")}>
      {children}
    </Container>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
