import { Building } from "../domain/building";

export interface ILiftPersistence {
    id: string;
    localization: string;
    state: string;
    building: Building;
  }

