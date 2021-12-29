import Room from "../models/Room";
import { RoomWithSchacht } from "../models/RoomWithSchacht";

export const elementsMinDistance = 18;
export const elementWidth = 75;

export const instalationTypes = [
    new Room(
      1,
      true,
      false,
      false,
      false
    ),
    new Room(
      2,
      false,
      false,
      false,
      false
    ),
    new RoomWithSchacht(
      3,
    ),
    new Room(
      4,
      false,
      false,
      true,
      false
    ),
    new Room(
      5,
      true,
      false,
      false,
      true
    ),
  ];
