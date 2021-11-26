import { clamp } from "three/src/math/MathUtils";
import BathroomElement from "./BathroomElement";

class Room {
  minRoomWidth: number = 200;
  maxRoomWidth: number = 800;
  minRoomHeight: number = 200;
  maxRoomHeight: number = 400;
  minFloorThickness: number = 1;
  maxFloorThickness: number = 20;
  roomWidth: number = 200;
  roomHeight: number = 0;
  roomDepth: number = 800;
  floorThickness: number = 1;
  wallThickness: number = 5;

  prewallWidth: number = 200;
  minPrewallWidth: number = 100;
  minPrewallHeight: number = 86;
  prewallHeight: number = 100;
  prewallThickness: number = 20;
  prewallLeft: number = 0;
  maxPrewallLeft: number = 0;
  maxPrewallRight: number = 0;
  prewallDistance: number = 0;
  prewallRight: number = 0;
  roomDividingPrewallDistance = 150;

  schachtSide: string = "left";
  schachtWidth: number = 50;
  schachtHeight: number = 200;
  schachtLeft: number = 0;
  schachtThickness: number = 20;

  instalationType: string;
  isPrewallFullHeight: Boolean;
  hasSchacht: Boolean;
  hasRoomDivider: Boolean;
  hasPartitionWall: Boolean;

  isPrewallHeightAdjustable: boolean = false;

  bathroomElements: BathroomElement[] = [];

  constructor(
    instalationType: string,
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
      this.hasRoomDivisionWall() ? this.roomDividingPrewallDistance : 0
    );
    this.setRoomHeight(300);
    this.setPrewallMaxLeftAndRight();
    this.setPrewallRight(this.roomWidth - this.prewallWidth);
  }

  setRoomWidth(width: number) {
    this.roomWidth = clamp(width, this.minRoomWidth, this.maxRoomWidth);
    this.setPrewallMaxLeftAndRight();
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

  setPrewallWidth(width: number) {
    this.prewallWidth = clamp(width, this.minPrewallWidth, this.roomWidth);
    this.prewallRight = this.roomWidth - this.prewallWidth;
    if (this.prewallWidth + this.prewallLeft > this.roomWidth)
      this.prewallLeft =
        this.roomWidth - this.prewallWidth;
  }

  setPrewallHeight(height: number) {
    this.prewallHeight = clamp(height, this.minPrewallHeight, this.roomHeight);
  }

  setPrewallMaxLeftAndRight() {
    this.maxPrewallLeft = this.roomWidth - this.minPrewallWidth;
    this.maxPrewallRight = this.roomWidth - this.minPrewallWidth;
  }

  setPrewallLeft(left: number) {
    if (left > this.maxPrewallLeft) return;
    this.prewallLeft = left;
    if (this.prewallWidth + this.prewallLeft > this.roomWidth) {
      this.setPrewallWidth(this.roomWidth - this.prewallLeft);
    }
    this.prewallRight = this.roomWidth - this.prewallLeft - this.prewallWidth;
  }

  setPrewallRight(right: number) {
    if (right <= this.maxPrewallRight) this.prewallRight = right;
    if (this.prewallWidth + this.prewallRight > this.roomWidth) {
      this.setPrewallWidth(this.roomWidth - this.prewallRight);
    }
    this.prewallLeft = this.roomWidth - this.prewallRight - this.prewallWidth;
  }

  setPrewallDistance(distance: number) {
    this.prewallDistance = distance;
  }

  setSchachtSide(side: string) {
    this.schachtSide = side;
  }

  setSchachtWidth(width: number) {
    this.schachtWidth = width;
  }

  hasRoomDivisionWall() {
    return this.hasRoomDivider || this.hasPartitionWall;
  }

  hasFixedPrewallHeight() {
    return this.isPrewallFullHeight || this.hasPartitionWall;
  }
}

export default Room;
