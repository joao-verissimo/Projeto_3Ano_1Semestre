import { Building } from '../domain/building';
import {Floor} from '../domain/floor';

export default interface IFloorDTO {
    id: string;
    building: Building;
    name: string;
    description: string;
    hall: string;
    room: number;
    floorMap: string;
    hasElevator: boolean;
    passages: Floor[];
  }
  