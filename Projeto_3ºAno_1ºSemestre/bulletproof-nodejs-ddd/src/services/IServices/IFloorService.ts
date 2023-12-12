import { Result } from '../../core/logic/Result';
import { Building } from '../../domain/building';
import IFloorDTO from '../../dto/IFloorDTO';

export default interface IFloorService {
  findByBuildingId(building: string): Promise<Result<IFloorDTO[]>>;
  addPassages(floor: IFloorDTO, passageData: any): Promise<Result<IFloorDTO>>; 
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  patchFloorMap(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  patchPassageBuilding(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  findAll(): Promise<Result<IFloorDTO[]>>;
}