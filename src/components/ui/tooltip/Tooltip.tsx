import React from "react";
import "./Tooltip.scss";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <div className="tooltip-wrapper">
      <div className="tooltip">{text}</div>
      <>{children}</>
    </div>
  );
};

export default Tooltip;
