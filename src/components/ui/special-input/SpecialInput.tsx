import React, { useEffect, useState } from "react";
import DropdownToggle from "../dropdown-toggle/DropdownToggle";
import "./SpecialInput.scss";

export interface SpecialInputOption {
  label: string;
  value: any;
}

interface SpecialInputProps {
  value: number | string;
  valueChangeHandler: (v: any) => any | void;
  unit?: string;
  options?: SpecialInputOption[];
}

const SpecialInput = ({
  value,
  valueChangeHandler,
  unit = "",
  options = [],
}: SpecialInputProps) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const hasOptions = () => options.length > 0;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    valueChangeHandler(value);
  };
  const hanleOptionSelect = (value: number) => {
    setDropdownActive(false);
    valueChangeHandler(value);
  };
  return (
    <div className={`special-input${dropdownActive ? " active" : ""}`}>
      <div className="wrapper">
        <input
          type="number"
          value={value}
          onChange={(e) => handleInputChange(e)}
        />
        {unit && <div className="unit">{unit}</div>}
        {hasOptions() && (
          <DropdownToggle
            active={dropdownActive}
            toggleHandler={() => setDropdownActive(!dropdownActive)}
          />
        )}
      </div>
      {dropdownActive && (
        <div className="options-wrapper">
          {options.map((option) => (
            <div
              className="option"
              onClick={() => hanleOptionSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialInput;
