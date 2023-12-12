import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building";
import { BuildingId } from "../../domain/buildingId";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IBuildingsRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  findByDomainId(buildingId: BuildingId | string): Promise<Building>;
  findByName(id: BuildingId | string): Promise<Building>;
  findAll(): Promise<Building[]>;
  findByFloors(minFloors: number, maxFloors: number): Promise<IBuildingDTO[]>;
}
