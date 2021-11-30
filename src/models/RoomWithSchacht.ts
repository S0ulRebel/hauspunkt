import { clamp } from "three/src/math/MathUtils";
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
  roomWithSchachtMinPrewallWidth: number = 68;

  constructor(instaletionType: string) {
    super(instaletionType, false, true, false, false);
    super.init();
    this.setSchachtWidth(this.minSchachtWidth);
    this.calculateMaxSchachtWidth();
    this.calculateSchachtPosition();
    this.setMinPrewallWidth(this.roomWithSchachtMinPrewallWidth);
    this.setPrewallPositionAdjustable(false);
    this.setPrewallWidth(this.roomWidth - this.schachtWidth);
    this.calculatePrewallPositionBySchacht();
    this.calculateMaxPrewallWidth();
  }

  setRoomWidth(width: number) {
    super.setRoomWidth(width);
    this.calculateSchachtPosition();
    this.calculateMaxSchachtWidth();
    this.schachtWidth = clamp(
      this.schachtWidth,
      this.minSchachtWidth,
      this.maxSchachtWidth
    );
    this.calculatePrewallPositionBySchacht();
    this.calculateMaxPrewallWidth();
    this.calculatePrewallMaxLeftAndRight();
  }

  calculateMaxSchachtWidth() {
    this.maxSchachtWidth = this.roomWidth - this.minPrewallWidth;
  }

  setSchachtSide(side: string) {
    this.schachtSide = side;
    this.calculateSchachtPosition();
    this.calculatePrewallPositionBySchacht();
  }

  calculateSchachtPosition() {
    if (this.schachtSide === "left") this.schachtLeft = 0;
    else {
      this.schachtLeft = this.roomWidth - this.schachtWidth;
    }
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
    this.calculatePrewallPositionBySchacht();
  }

  calculatePrewallPositionBySchacht() {
    this.prewallLeft =
      this.schachtSide === "left"
        ? this.schachtWidth
        : this.roomWidth - this.schachtWidth - this.prewallWidth;
  }

  calculateMaxPrewallWidth() {
    this.maxPrewallWidth = this.roomWidth - this.schachtWidth;
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

  setPrewallWidth(width: number) {
    this.prewallWidth = clamp(
      width,
      this.minPrewallWidth,
      this.maxPrewallWidth
    );
    this.calculateMaxSchachtWidth();
    this.calculatePrewallPositionBySchacht();
  }
}
