import React from "react";
import './AddElelmentButton.scss';

interface AddElementButtonProps {
  label: string;
  img: any;
  clickHandler: () => void;
}

const AddElementButton = ({
  label,
  img,
  clickHandler,
}: AddElementButtonProps) => {
  return (
    <div className="add-element-button" onClick={() => clickHandler()}>
      <img src={img} alt={label}/>
      <div className="add-element-button__label">{label}</div>
    </div>
  );
};

export default AddElementButton;
