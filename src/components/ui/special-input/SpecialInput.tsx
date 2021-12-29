import React, { useEffect, useState } from "react";
import { clamp } from "three/src/math/MathUtils";
import DropdownToggle from "../dropdown-toggle/DropdownToggle";
import "./SpecialInput.scss";

export interface SpecialInputOption {
  label: string;
  value: any;
}

interface SpecialInputProps {
  value: number;
  valueChangeHandler: (v: any) => any | void;
  min: number;
  max: number;
  unit?: string;
  options?: SpecialInputOption[];
}

const SpecialInput = ({
  value,
  valueChangeHandler,
  min,
  max,
  unit = "",
  options = [],
}: SpecialInputProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [dropdownActive, setDropdownActive] = useState(false);
  const hasOptions = () => options.length > 0;

  const handleInputChange = (value: number) => {
    valueChangeHandler(value);
    setCurrentValue(clamp(currentValue, min, max));
  };

  const hanleOptionSelect = (value: number) => {
    setDropdownActive(false);
    valueChangeHandler(value);
  };

  const handleKeyDown = (e: any) => {
    if (e.code === "Enter") {
      handleInputChange(e.target.value);
    }
  };

  useEffect(() => {
    setCurrentValue(value);
    console.log(value, "useEffect");
  }, [value]);

  return (
    <div className={`special-input${dropdownActive ? " active" : ""}`}>
      <div className="wrapper">
        <input
          type="number"
          value={currentValue}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setCurrentValue(+e.target.value)}
          onBlur={(e) => handleInputChange(+e.target.value)}
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
