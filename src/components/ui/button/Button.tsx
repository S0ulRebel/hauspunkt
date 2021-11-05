import React from "react";
import './Button.scss';

interface ButtonProps {
  text: string;
  clickHandler: () => any | void;
}

const Button = ({ text, clickHandler }: ButtonProps) => {
  return (
    <div className="button" onClick={() => clickHandler()}>
      {text}
    </div>
  );
};

export default Button;
