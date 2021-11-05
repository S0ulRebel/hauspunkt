import React from "react";
import BathroomElement from "../models/BathroomElement";

export interface Room {
  roomWidth: number;
  roomHeight: number;
  wallThickness: number;
  roomDepth: number;
  minRoomWidth: number;
  maxRoomWidth: number;
  minRoomHeight: number;
  maxRoomHeight: number;
  prewall: boolean;
  schacht: boolean;
}

export interface Prewall {
  prewallWidth: number;
  prewallHeight: number;
  prewallThickness: number;
  minPrewallWidth: number;
  minPrewallHeight: number;
  prewallLeft: number;
  prewallRight: number;
}

export interface Schacht {
  side: "left" | "right";
  schachtWidth: number;
  schachtHeight: number;
  schachtThickness: number;
}

export interface IConfigContext {
  room: Room;
  prewall: Prewall;
  schacht: Schacht;
  bathroomElements: BathroomElement[];
}

export const defaultConfigVlues = {
  room: {
    roomWidth: 2.0,
    roomHeight: 3.0,
    minRoomWidth: 2.0,
    maxRoomWidth: 8.0,
    minRoomHeight: 2.0,
    maxRoomHeight: 4.0,
    wallThickness: 0.2,
    roomDepth: 2.0,
    prewall: true,
    schacht: false,
  },
  prewall: {
    prewallWidth: 2.0,
    minPrewallWidth: 1.0,
    minPrewallHeight: 0.86,
    prewallHeight: 1.0,
    prewallThickness: 0.2,
    prewallLeft: 0,
    prewallRight: 0,
  },
  schacht: {
    side: "left",
    schachtWidth: 0.5,
    schachtHeight: 2.0,
    schachtThickness: 0.2,
  },
  bathroomElements: [],
};

export const ConfigContext = React.createContext<any>({} as any);
