import { clamp, generateUUID } from "three/src/math/MathUtils";

export type BathroomElementType = "toilet" | "urinal" | "sink" | "bidet";

export const elementWidth = 75;

export const elementsMinDistance = 18;

export default class BathroomElement {
  id: string;
  type: BathroomElementType;
  width: number = elementWidth;
  x: number;
  minX: number;
  maxX: number;

  constructor(
    t: BathroomElementType,
    x: number,
    minX: number,
    maxX: number
  ) {
    this.id = generateUUID();
    this.type = t;
    this.x = x;
    this.minX = minX;
    this.maxX = maxX;
  }

  setX(value: number) {
    this.x = clamp(value, this.minX, this.maxX);
  }

  setMinX(value: number) {
      this.minX = value;
  }

  setMaxX(value: number) {
      this.maxX = value;
  }
}
