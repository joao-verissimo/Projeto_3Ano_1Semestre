import { Result } from "../../core/logic/Result";
import { Building } from "../../domain/building";
import { BuildingId } from "../../domain/buildingId";
import IBuildingDTO from "../../dto/IBuildingDTO";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IBuildingsService {
  findByDomainId(buildingId: BuildingId): Promise<Building>;
  ListBuildingFloorWithPassageToOtherBuilding(buildingId: string): Promise<IFloorDTO[]>;
  createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  getBuilding(buildingId: string): Promise<Result<IBuildingDTO>>;
  findAll(): Promise<Building[]>;
  listBuildingsByFloors(minFloors: number, maxFloors: number): Promise<IBuildingDTO[]>;
  getAllFloorsInBuilding(buildingId: BuildingId): Promise<IFloorDTO[]>;
}
