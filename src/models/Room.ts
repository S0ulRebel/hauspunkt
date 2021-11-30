import { clamp } from "three/src/math/MathUtils";
import BathroomElement from "./BathroomElement";

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
  instalationType: string;
  isPrewallFullHeight: Boolean;
  hasSchacht: Boolean;
  hasRoomDivider: Boolean;
  hasPartitionWall: Boolean;

  // controls configuration parameters
  isPrewallHeightAdjustable: boolean = false;
  isPrewallPositionAdjustable: boolean = true;

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
    this.setPrewallPositionAdjustable(true);
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

  setRoomWidth(width: number) {
    this.roomWidth = clamp(width, this.minRoomWidth, this.maxRoomWidth);
    this.calculatePrewallMaxLeftAndRight();
    this.calculateMaxPrewallWidth();
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

  calculateMaxPrewallWidth() {
    this.maxPrewallWidth = this.roomWidth;
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
    this.prewallWidth = clamp(width, this.minPrewallWidth, this.roomWidth);
    this.prewallRight = this.roomWidth - this.prewallWidth;
    if (this.prewallWidth + this.prewallLeft > this.roomWidth) {
      this.prewallLeft = this.roomWidth - this.prewallWidth;
    }
  }

  setPrewallHeight(height: number) {
    this.prewallHeight = clamp(height, this.minPrewallHeight, this.roomHeight);
  }

  calculatePrewallMaxLeftAndRight() {
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

  isRoomDivided() {
    return this.hasRoomDivider || this.hasPartitionWall;
  }

  hasFixedPrewallHeight() {
    return this.isPrewallFullHeight || this.hasPartitionWall;
  }
}

export default Room;
