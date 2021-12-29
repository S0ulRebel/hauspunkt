import { clamp } from "three/src/math/MathUtils";
import BathroomElement, { elementsMinDistance, elementWidth } from "./BathroomElement";
import Room from "./Room";

export class RoomWithSchacht extends Room {
  // schacht parameters
  schachtSide: string = "right";
  schachtWidth: number = 50;
  minSchachtWidth: number = 50;
  maxSchachtWidth: number = 200;
  schachtHeight: number = 200;
  schachtLeft: number = 0;
  schachtThickness: number = 20;
  defaultMinPrewallWidth: number = 68;
  minPrewallWidth: number = 68;
  isPrewallPositionAdjustable: boolean = false;
  minPrewallLeft: number = 0;
  minPrewallRight: number = 0;

  constructor(instaletionType: number) {
    super(instaletionType, false, true, false, false);
    super.init();
    this.setPrewallWidth(this.roomWidth - this.schachtWidth);
    this.update();
  }

  update() {
    this.calculateMinPrewallWidth();
    this.calculateMaxPrewallWidth();
    this.calculateMinMaxXForAllElements();
    this.calculatePrewallMaxLeftAndRight();
    this.prewallWidth = clamp(
      this.prewallWidth,
      this.minPrewallWidth,
      this.maxPrewallWidth
    );
    this.calculateSchachtPosition();
    this.calculateMaxSchachtWidth();
    this.calculatePrewallPositionBySchacht();
    this.schachtWidth = clamp(
      this.schachtWidth,
      this.minSchachtWidth,
      this.maxSchachtWidth
    );
    this.prewallLeft = clamp(
      this.prewallLeft,
      this.minPrewallLeft,
      this.maxPrewallLeft
    );
    this.prewallRight = clamp(
      this.prewallRight,
      this.minPrewallRight,
      this.maxPrewallRight
    );
    this.calculateDimensionLinesForActiveElement();
  }

  calculateMaxSchachtWidth() {
    this.maxSchachtWidth = this.roomWidth - this.minPrewallWidth;
  }

  calculateSchachtPosition() {
    if (this.schachtSide === "left") this.schachtLeft = 0;
    else {
      this.schachtLeft = this.roomWidth - this.schachtWidth;
    }
  }

  calculatePrewallPositionBySchacht() {
    this.prewallLeft =
      this.schachtSide === "left"
        ? this.schachtWidth
        : this.roomWidth - this.schachtWidth - this.prewallWidth;
  }

  calculateMinPrewallWidth() {
    const elementsHorizontalSpace = this.getSpaceOccupiedByElements();
    this.minPrewallWidth = Math.max(
      this.defaultMinPrewallWidth,
      elementsHorizontalSpace - this.schachtWidth
    );
  }

  calculateMaxPrewallWidth() {
    this.maxPrewallWidth = this.roomWidth - this.schachtWidth;
  }

  calculatePrewallMinLeftAndRight() {
    this.minPrewallLeft =
      this.schachtSide === "left"
        ? this.schachtWidth
        : this.roomWidth - this.schachtWidth - this.prewallWidth;
    this.minPrewallRight =
      this.schachtSide === "right"
        ? this.schachtWidth
        : this.roomWidth - this.schachtWidth - this.prewallWidth;
  }

  calculatePrewallMaxLeftAndRight() {
    this.maxPrewallLeft =
      this.schachtSide === "left"
        ? this.schachtWidth
        : this.roomWidth - this.schachtWidth - this.prewallWidth;
    this.maxPrewallRight =
      this.schachtSide === "right"
        ? this.schachtWidth
        : this.roomWidth - this.schachtWidth - this.prewallWidth;
  }

  calculateDimensionLinesForActiveElement() {
    if (!this.activeElelmentId) {
      this.dimensionLines = [];
      return;
    }
    const index = this.bathroomElements.findIndex(
      (e: BathroomElement) => e.id === this.activeElelmentId
    );
    const element = this.bathroomElements[index];
    const lineY = -this.prewallHeight / 2 + 10;

    const previousElement = index > 0 ? this.bathroomElements[index - 1] : null;
    const minX = this.schachtSide === 'left' ? this.schachtLeft : this.prewallLeft;
    const left = previousElement
      ? element.x - (previousElement.x + element.width)
      : element.x - minX;
    const leftDimensionLine = {
      start: [-element.width / 2 - left, lineY],
      end: [-element.width / 2, lineY],
      labelOffset: 10,
    };

    const nextElement =
      index < this.bathroomElements.length - 1
        ? this.bathroomElements[index + 1]
        : null;
      const maxX = this.schachtSide === 'right' ? this.roomWidth : this.prewallLeft + this.prewallWidth;
    const right = nextElement
      ? nextElement.x
      : maxX;
    const rightDimensionLine = {
      start: [element.width / 2, lineY],
      end: [right - element.x - element.width / 2, lineY],
      labelOffset: -10,
    };

    this.dimensionLines = [leftDimensionLine, rightDimensionLine];
  }

  setRoomWidth(width: number) {
    width = clamp(width, this.minRoomWidth, this.maxRoomWidth);
    if (this.schachtSide === "right") {
      const diff = width - this.roomWidth;
      this.bathroomElements.forEach((e) => {
        e.setX(e.x + diff);
      });
    }
    this.roomWidth = width;
  }

  setSchachtSide(side: string) {
    this.schachtSide = side;
  }

  setSchachtWidth(width: number) {
    const newSchachtWidth = clamp(
      width,
      this.minSchachtWidth,
      this.maxSchachtWidth
    );

    this.schachtWidth = newSchachtWidth;
    this.calculateMaxPrewallWidth();
    this.calculateSchachtPosition();

    const diff = this.schachtWidth - newSchachtWidth;

    if (diff > 0) {
      let newPrewallWidth = this.prewallWidth + diff;
      newPrewallWidth = clamp(
        newPrewallWidth,
        this.minPrewallWidth,
        this.maxPrewallWidth
      );
      this.setPrewallWidth(newPrewallWidth);
    }
    if (this.prewallWidth + this.schachtWidth > this.roomWidth) {
      this.prewallWidth = this.roomWidth - this.schachtWidth;
    }
  }

  setPrewallWidth(width: number) { 
    width = clamp(
      width,
      this.minPrewallWidth,
      this.maxPrewallWidth
    );
    const diff = this.prewallWidth - width;
    const direction = this.schachtSide === 'right' ? 1 : -1;
    this.bathroomElements.forEach((e: BathroomElement) => {
      if(diff > 0) e.setX(e.x + diff * direction);
    })
    this.prewallWidth = width;  
  }

  getMinMaxXForElementIndex(index: number) {
    const { length } = this.bathroomElements;
    const minLeft =
      this.schachtSide === "left" ? this.schachtLeft : this.prewallLeft;
    const minX =
      index === 0
        ? minLeft + elementsMinDistance
        : this.bathroomElements[index - 1].x +
          elementWidth +
          elementsMinDistance;

    const maxRight =
      this.schachtSide === "right"
        ? this.roomWidth - elementWidth
        : this.prewallLeft + this.prewallWidth - elementWidth;
    const maxX =
      index === length - 1
        ? maxRight - elementsMinDistance
        : this.bathroomElements[index + 1].x -
          elementWidth -
          elementsMinDistance;

    return [minX, maxX];
  }
}
