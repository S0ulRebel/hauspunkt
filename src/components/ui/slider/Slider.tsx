import React, { useEffect, useRef } from "react";
import "./Slider.scss";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  step: number;
  valueChangeHandler: (v: any) => void | any;
  positionChangeHandler: (v: any) => void | any;
}

const Slider = ({
  min,
  max,
  value,
  step,
  valueChangeHandler,
  positionChangeHandler,
}: SliderProps) => {
  const inputRef = useRef<any>();

  const hanlePositionChange = (newValue: number) => {
    const totalInputWidth = inputRef.current.clientWidth;
    const thumbWidth = 16;
    const thumbHalfWidth = 8;
    const position =
      ((newValue - min) / (max - min)) * (totalInputWidth - thumbWidth) +
      thumbHalfWidth;
      positionChangeHandler(position);
  }

  const handleValueChange = (newValue: number) => {
    valueChangeHandler(newValue);
    hanlePositionChange(newValue);
  };

  useEffect(() => {
    hanlePositionChange(value);
  }, [])

  return (
    <div className="slider-container">
      <input
        ref={inputRef}
        className="slider"
        type="range"
        min={min}
        max={max}
        value={value}
        step={1}
        onChange={(e) => handleValueChange(+e.target.value)}
      />
    </div>
  );
};

export default Slider;
