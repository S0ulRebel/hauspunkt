import React, { useState } from "react";
import "./Expandable.scss";

interface ExpandableProps {
  title: string;
  children: React.ReactNode;
}

const Expandable = ({ title, children }: ExpandableProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`expandable${expanded ? ' expanded' : ''}`}>
      <div className="expandable__title-wrapper">
        <h3 className="expandable__title">{title}</h3>
        <div
          className="expandable__icon"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "-" : "+"}
        </div>
      </div>
      {expanded && <>{children}</>}
    </div>
  );
};

export default Expandable;
