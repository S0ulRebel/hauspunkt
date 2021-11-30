import React from "react";
import './SideSelectButton.scss';

interface SideSelectButtonProps {
  side: "left" | "right";
  title: string;
  active: boolean;
  clickHandler: () => void;
}

const SideSelectButton = ({
  side,
  title,
  active,
  clickHandler,
}: SideSelectButtonProps) => {
  return (
    <div
      className={`side-select-button${active ? " active" : ""}`}
      onClick={() => clickHandler()}
    >
      {side === "left" ? "L " : "R "}
      {title}
    </div>
  );
};

export default SideSelectButton;
