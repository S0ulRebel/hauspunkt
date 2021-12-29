import { clamp } from "three/src/math/MathUtils";
import BathroomElement, {
  BathroomElementType,
  elementsMinDistance,
  elementWidth,
} from "./BathroomElement";

class Room {
  // Room parameters
  roomWidth: number = 200;
  minRoomWidth: number = 200;
  maxRoomWidth: number = 800;
  roomHeight: number = 0;
  minRoomHeight: number = 200;
  maxRoomHeight: number = 400;
  roomDepth: number = 800;
  floorThickness: number = 1;
  minFloorThickness: number = 1;
  maxFloorThickness: number = 20;
  wallThickness: number = 5;

  //prewall parameters
  prewallWidth: number = 200;
  defaultMinPrewallWidth: number = 100;
  minPrewallWidth: number = 100;
  maxPrewallWidth: number = 200;
  minPrewallHeight: number = 86;
  prewallHeight: number = 100;
  prewallThickness: number = 20;
  prewallLeft: number = 0;
  maxPrewallLeft: number = 0;
  maxPrewallRight: number = 0;
  prewallDistance: number = 0;
  prewallRight: number = 0;
  dividedRoomPrewallDistance = 150;

  // instalation type parameters
  instalationType: number;
  isPrewallFullHeight: Boolean;
  hasSchacht: Boolean;
  hasRoomDivider: Boolean;
  hasPartitionWall: Boolean;

  // controls configuration parameters
  isPrewallHeightAdjustable: boolean = false;
  isPrewallPositionAdjustable: boolean = true;

  bathroomElements: BathroomElement[] = [];
  activeElelmentId: string = "";
  dimensionLines: any[] = [];

  constructor(
    instalationType: number,
    isPrewallFullHeight = false,
    hasSchacht = false,
    hasRoomDivider = false,
    hasPartitionWall = false
  ) {
    this.instalationType = instalationType;
    this.isPrewallFullHeight = isPrewallFullHeight;
    this.hasRoomDivider = hasRoomDivider;
    this.hasPartitionWall = hasPartitionWall;
    this.hasSchacht = hasSchacht;
    this.init();
  }

  init() {
    this.setPrewallDistance(
      this.isRoomDivided() ? this.dividedRoomPrewallDistance : 0
    );
    this.setRoomHeight(300);
    this.calculatePrewallMaxLeftAndRight();
    this.setPrewallRight(this.roomWidth - this.prewallWidth);
  }

  performAction(actionType: string, payload: any) {
    (this as any)[actionType](payload);
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
    this.prewallLeft = clamp(this.prewallLeft, 0, this.maxPrewallLeft);
    this.prewallRight = clamp(this.prewallRight, 0, this.maxPrewallRight);
    this.calculateDimensionLinesForActiveElement();
  }

  calculateMinPrewallWidth() {
    const elementsHorizontalSpace = this.getSpaceOccupiedByElements();
    this.minPrewallWidth = Math.max(
      this.defaultMinPrewallWidth,
      elementsHorizontalSpace
    );
  }

  calculateMaxPrewallWidth() {
    this.maxPrewallWidth = this.roomWidth;
  }

  calculatePrewallMaxLeftAndRight() {
    const occupiedSpace = this.getSpaceOccupiedByElements();
    const min = Math.max(this.minPrewallWidth, occupiedSpace);
    this.maxPrewallLeft = this.roomWidth - min;
    this.maxPrewallRight = this.roomWidth - min;
  }

  calculateMinMaxXForAllElements() {
    this.bathroomElements.forEach((el: BathroomElement, index) => {
      const currentElement = this.bathroomElements[index];
      const [minX, maxX] = this.getMinMaxXForElementIndex(index);
      currentElement.setMinX(minX);
      currentElement.setMaxX(maxX);
    });
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
    const left = previousElement
      ? element.x - (previousElement.x + element.width)
      : element.x - this.prewallLeft;
    const leftDimensionLine = {
      start: [-element.width / 2 - left, lineY],
      end: [-element.width / 2, lineY],
      labelOffset: 10,
    };

    const nextElement =
      index < this.bathroomElements.length - 1
        ? this.bathroomElements[index + 1]
        : null;
    const right = nextElement
      ? nextElement.x
      : this.prewallLeft + this.prewallWidth;
    const rightDimensionLine = {
      start: [element.width / 2, lineY],
      end: [right - element.x - element.width / 2, lineY],
      labelOffset: -10,
    };

    this.dimensionLines = [leftDimensionLine, rightDimensionLine];
  }

  setRoomWidth(width: number) {
    this.roomWidth = clamp(width, this.minRoomWidth, this.maxRoomWidth);
  }

  setRoomHeight(height: number) {
    this.roomHeight = clamp(height, this.minRoomHeight, this.maxRoomHeight);
    if (this.isPrewallFullHeight || this.prewallHeight > height) {
      this.setPrewallHeight(height);
    }
  }

  setFloorThickness(thickness: number) {
    this.floorThickness = clamp(
      thickness,
      this.minFloorThickness,
      this.maxFloorThickness
    );
  }

  setPrewallHeightAdjustable(isAdjustable: boolean) {
    this.isPrewallHeightAdjustable = isAdjustable;
  }

  setPrewallPositionAdjustable(isAdjustable: boolean) {
    this.isPrewallPositionAdjustable = isAdjustable;
  }

  setMinPrewallWidth(width: number) {
    this.minPrewallWidth = width;
  }

  setPrewallWidth(width: number) {
    const elementsHorizontalSpace = this.getSpaceOccupiedByElements();
    const min = Math.max(this.minPrewallWidth, elementsHorizontalSpace);
    const diff = width - this.prewallWidth;
    this.bathroomElements.forEach((e) => {
      e.setX(e.x + diff);
    });
    this.prewallWidth = clamp(width, min, this.roomWidth);
    this.prewallRight = this.roomWidth - this.prewallWidth;
    if (this.prewallWidth + this.prewallLeft > this.roomWidth) {
      this.prewallLeft = this.roomWidth - this.prewallWidth;
    }
  }

  setPrewallHeight(height: number) {
    this.prewallHeight = clamp(height, this.minPrewallHeight, this.roomHeight);
  }

  setPrewallLeft(left: number) {
    if (left > this.maxPrewallLeft) return;
    const diff = left - this.prewallLeft;
    this.bathroomElements.forEach((e) => {
      e.setX(e.x + diff);
    });
    this.prewallLeft = left;
    if (this.prewallWidth + this.prewallLeft > this.roomWidth) {
      this.setPrewallWidth(this.roomWidth - this.prewallLeft);
    }
    this.prewallRight = this.roomWidth - this.prewallLeft - this.prewallWidth;
  }

  setPrewallRight(right: number) {
    if (right > this.maxPrewallRight) return;
    const diff = right - this.prewallRight;
    this.bathroomElements.forEach((e) => {
      e.setX(e.x - diff);
    });
    this.prewallRight = right;
    if (this.prewallWidth + this.prewallRight > this.roomWidth) {
      this.setPrewallWidth(this.roomWidth - this.prewallRight);
    }
    this.prewallLeft = this.roomWidth - this.prewallRight - this.prewallWidth;
  }

  setPrewallDistance(distance: number) {
    this.prewallDistance = distance;
  }

  sortBathroomElementsByX() {
    this.bathroomElements = this.bathroomElements.sort((a, b) => a.x - b.x);
  }

  getMinMaxXForElementIndex(index: number) {
    const { length } = this.bathroomElements;
    const minX =
      index === 0
        ? this.prewallLeft + elementsMinDistance
        : this.bathroomElements[index - 1].x +
          elementWidth +
          elementsMinDistance;

    const maxX =
      index === length - 1
        ? this.prewallLeft +
          this.prewallWidth -
          elementWidth -
          elementsMinDistance
        : this.bathroomElements[index + 1].x -
          elementWidth -
          elementsMinDistance;

    return [minX, maxX];
  }

  getSpaceOccupiedByElements() {
    const numElements = this.bathroomElements.length;
    if (numElements < 1) return this.minPrewallWidth;
    const firstElement = this.bathroomElements[0];
    const lastElement = this.bathroomElements[numElements - 1];
    const hSpace =
      lastElement.x - firstElement.x + elementWidth + elementsMinDistance * 2;
    return hSpace;
  }

  setBathroomElementX({ id, value }: { id: string; value: number }) {
    const element = this.bathroomElements.find(
      (el: BathroomElement) => el.id === id
    );
    if (element) {
      element.setX(value);
    }
  }

  setActiveElementId(id: string) {
    this.activeElelmentId = id;
  }

  addBathroomElement(type: BathroomElementType) {
    const newElement = new BathroomElement(type, 0, 0, 0);
    this.bathroomElements.push(newElement);
    const { length } = this.bathroomElements;
    const [minX, maxX] = this.getMinMaxXForElementIndex(length - 1);
    newElement.setMinX(minX);
    newElement.setMaxX(maxX);
    newElement.setX(minX);
    if (newElement.x > maxX) this.bathroomElements.pop();
    this.sortBathroomElementsByX();
  }

  deleteBathroomElement(id: string) {
    const result = this.bathroomElements.filter((e) => e.id !== id);
    this.bathroomElements = [...result];
    this.activeElelmentId = '';
    this.calculateMinMaxXForAllElements();
  }

  clearBathroomElements() {
    this.bathroomElements = [];
  }

  moveActiveElement(value: number) {
    const element = this.bathroomElements.find(
      (e) => e.id === this.activeElelmentId
    );
    if (element) {
      const newX = element.x + value;
      const x = clamp(newX, element.minX, element.maxX);
      element.setX(x);
    }
    this.update();
  }

  isRoomDivided() {
    return this.hasRoomDivider || this.hasPartitionWall;
  }

  hasFixedPrewallHeight() {
    return this.isPrewallFullHeight || this.hasPartitionWall;
  }
}

export default Room;
