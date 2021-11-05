import React from "react";

interface DimensionsInputGroupProps {
  label: string;
  value: number;
  min: number;
  max: number;
  handler: (value: number) => void | any;
}

const DimensionsInputGroup = ({
  label,
  value,
  min,
  max,
  handler,
}: DimensionsInputGroupProps) => {
  return (
    <div className="control-group">
      <label>{label}</label>
      <input
        type="number"
        value={(value * 100).toFixed()}
        min={min * 100}
        max={max * 100}
        step={1}
        onChange={(e) => handler(+e.target.value / 100)}
      />
      <div className="value-wrapper">
        <input
          type="text"
          value={(value * 100).toFixed()}
          min={min * 100}
          max={max * 100}
          step={1}
          onChange={(e) => handler(+e.target.value / 100)}
        />
        <label className="unit">{"cm"}</label>
      </div>
    </div>
  );
};

export default DimensionsInputGroup;
