import { Floor } from "../../domain/floor";
import { Repo } from "../../core/infra/Repo";
import { FloorId } from "../../domain/floorId";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorRepo extends Repo<Floor>{
    save(floor: Floor): Promise<Floor>;
    findByID(id: FloorId | string): Promise<Floor>;
    exists (floor: Floor): Promise<boolean>;
    findByBuildingId(buildingId: string): Promise<IFloorDTO[]>;
    findAll(): Promise<IFloorDTO[]>;
    findByName(name: string): Promise<IFloorDTO | null>;
}