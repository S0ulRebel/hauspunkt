import React from "react";
import BathroomElement from "../models/BathroomElement";
import Room from "../models/Room";

// export interface Room {
//   roomWidth: number;
//   roomHeight: number;
//   floorThickness: number;
//   wallThickness: number;
//   roomDepth: number;
//   minRoomWidth: number;
//   maxRoomWidth: number;
//   minRoomHeight: number;
//   maxRoomHeight: number;
//   prewall: boolean;
//   schacht: boolean;
// }

// export interface Prewall {
//   prewallWidth: number;
//   prewallHeight: number;
//   prewallThickness: number;
//   minPrewallWidth: number;
//   minPrewallHeight: number;
//   prewallLeft: number;
//   prewallRight: number;
// }

// export interface Schacht {
//   side: "left" | "right";
//   schachtWidth: number;
//   schachtHeight: number;
//   schachtThickness: number;
// }

// export interface ConfigContext {
//   room: Room;
//   prewall: Prewall;
//   schacht: Schacht;
//   bathroomElements: BathroomElement[];
// }

// export const defaultConfigVlues = {
//   room: {
//     roomWidth: 200,
//     roomHeight: 300,
//     floorThickness: 1,
//     minRoomWidth: 200,
//     maxRoomWidth: 800,
//     minRoomHeight: 200,
//     maxRoomHeight: 400,
//     minFloorThickness: 1,
//     maxFloorThickness: 20,
//     wallThickness: 5,
//     roomDepth: 800,
//     prewall: true,
//     schacht: false,
//   },
//   prewall: {
//     prewallWidth: 200,
//     minPrewallWidth: 100,
//     minPrewallHeight: 86,
//     prewallHeight: 100,
//     prewallThickness: 20,
//     prewallLeft: 0,
//     prewallRight: 0,
//   },
//   schacht: {
//     side: "left",
//     schachtWidth: 50,
//     schachtHeight: 200,
//     schachtThickness: 20,
//   },
//   bathroomElements: [],
//   dimensionLines: [],
// };

export interface ConfigContext {
  room: Room;
  bathroomElements: BathroomElement[];
}

export const defaultConfigVlues = {
  room: new Room(
    "Raumhohe Vorwand",
    true,
    false,
    false,
    false
  ),
  bathroomElements: [],
};

export const ConfigContext = React.createContext<any>({} as any);
