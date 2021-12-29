import React from "react";
import { ReactComponent as IconSchacht } from "./../../../assets/icons/schacht.svg";
import "./SideSelectButton.scss";

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
      className={`side-select-button${active ? " active" : ""}${side === "right" ? "" :" flip"}`}
      onClick={() => clickHandler()}
    >
      <IconSchacht />
      {title}
    </div>
  );
};

export default SideSelectButton;
