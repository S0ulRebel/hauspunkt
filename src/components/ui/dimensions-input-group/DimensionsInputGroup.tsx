import React, { useRef } from "react";
import Slider from "../slider/Slider";
import SpecialInput, {
  SpecialInputOption,
} from "../special-input/SpecialInput";
import Tooltip from "../tooltip/Tooltip";
import "./DimensionsInputGroup.scss";

interface DimensionsInputGroupProps {
  label: string;
  value: number;
  min: number;
  max: number;
  handler: (value: number) => void | any;
  unit?: string;
  tooltipText?: string;
  options?: SpecialInputOption[];
}

const DimensionsInputGroup = ({
  label,
  value,
  min,
  max,
  handler,
  unit = "cm",
  tooltipText = "",
  options = [],
}: DimensionsInputGroupProps) => {
  const textInputRef = useRef<any>();
  const handleThumbPositionChange = (e: any) => {
    const halfWidth = textInputRef.current.clientWidth / 2;
    textInputRef.current.style.left = e - halfWidth + "px";
  };
  return (
    <div className="control-group">
      <div className="label-wrapper">
        {tooltipText ? (
          <Tooltip text={tooltipText}>
            <label>{label}</label>
          </Tooltip>
        ) : (
          <label>{label}</label>
        )}
      </div>
      <div className="value-wrapper">
        <Slider
          value={value}
          min={min}
          max={max}
          step={1}
          valueChangeHandler={(e) => handler(e)}
          positionChangeHandler={(e) => {
            handleThumbPositionChange(e);
          }}
        />
        <div ref={textInputRef} className="special-input-wrapper">
          <SpecialInput value={value} unit={unit} options={options} valueChangeHandler={(v) => handler(v) } />
        </div>
      </div>
    </div>
  );
};

export default DimensionsInputGroup;
