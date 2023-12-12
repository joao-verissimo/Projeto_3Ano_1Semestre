import { Floor } from "../domain/floor";
import { IBuildingsPersistence } from "./IBuildingsPersistence";

export interface IFloorPersistence {
    id:string;
    building: IBuildingsPersistence;
    name: string;
    description: string;
    hall: string;
    room: number;
    floorMap: string;
    hasElevator: boolean;
    passages: Floor[];
  }