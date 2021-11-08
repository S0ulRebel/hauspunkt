import React from "react";
import "./Overlay.scss";

interface OverlayProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const Overlay = ({ children, isVisible }: OverlayProps) => {
  return <>{isVisible && <div className="overlay">{children}</div>}</>;
};

export default Overlay;
