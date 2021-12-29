import React from "react";
import Room from "../models/Room";

export interface ConfigContext {
  room: Room;
}

export const defaultConfigVlues = {
  room: new Room(
    1,
    true,
    false,
    false,
    false
  ),
};

export const ConfigContext = React.createContext<any>({} as any);
