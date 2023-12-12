import Container, { Service, Inject } from 'typedi';
import IFloorService from './IServices/IFloorService';
import { FloorMap } from '../mappers/FloorMap';
import IFloorDTO from '../dto/IFloorDTO';
import IFloorRepo from '../repos/IRepos/IFloorRepo';
import { Result } from '../core/logic/Result';
import config from '../../config';
import { Floor } from '../domain/floor';
import IBuildingsService from './IServices/IBuildingsService';
import IBuildingsRepo from '../repos/IRepos/IBuildingsRepo';
import { BuildingId } from '../domain/buildingId';


@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo, 
  ) {}

  async addPassages(floor: IFloorDTO, passageData: any): Promise<Result<IFloorDTO>> {
    try {
      const errorOrFloor = await this.floorRepo.findByID(floor.id);

      if (!errorOrFloor) {
        return Result.fail<IFloorDTO>('Floor not found');
      }

      errorOrFloor.passages.push(...passageData);

      await this.floorRepo.save(errorOrFloor);
      const floorDTOResult = FloorMap.toDTO(errorOrFloor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  async createFloor(floorDTO:IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const buildingsrv = Container.get<IBuildingsRepo>(config.repos.buildings.name);
      const passages = await Promise.all(floorDTO.passages.map(async floor => {
        return await this.floorRepo.findByID(floor.id);
      }));

      // Check if a floor with the same name already exists
      const existingFloor = await this.floorRepo.findByName(floorDTO.name);
      if (existingFloor) {
        return Result.fail<IFloorDTO>('Floor with the same name already exists');
      }

      const floorOrError = Floor.create ({
        name: floorDTO.name,
        building: await buildingsrv.findByDomainId((floorDTO.building.toString()) as unknown as BuildingId),
        description: floorDTO.description,
        hall: floorDTO.hall,
        room: floorDTO.room,
        floorMap: floorDTO.floorMap,
        hasElevator: floorDTO.hasElevator,
        passages: passages
      });

      if (floorOrError.isFailure){
        throw Result.fail<IFloorDTO>(floorOrError.errorValue());
      }
      
      const floorResult = floorOrError.getValue();
      const found = await this.floorRepo.exists(floorResult);
      if (found){
        return Result.fail<IFloorDTO>('Floor Already Exists')
      }
      await this.floorRepo.save(floorResult); 
      const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO; 
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByID(floorDTO.id)
      const buildingsrv = Container.get<IBuildingsService>(config.services.buildings.name);
      
      if (floor === null) {
        return Result.fail<IFloorDTO>("Floor not found");
      } else {
        const passages = await Promise.all(floorDTO.passages.map(async floor => {
          return await this.floorRepo.findByID(floor.id);
        }));

        floor.name = floorDTO.name;
        floor.building = await buildingsrv.findByDomainId((floorDTO.building.toString()) as unknown as BuildingId);
        floor.description = floorDTO.description;
        floor.hall = floorDTO.hall;
        floor.room = floorDTO.room;
        floor.floorMap = floorDTO.floorMap;
        floor.hasElevator = floorDTO.hasElevator;
        floor.passages = passages;

        await this.floorRepo.save(floor); 
        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO; 
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async patchFloorMap(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByID(floorDTO.id);
      if (!floor) {
        return Result.fail<IFloorDTO>('Floor not found');
      }
      
      floor.floorMap = floorDTO.floorMap;
      await this.floorRepo.save(floor);
      const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async patchPassageBuilding(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByID(floorDTO.id);
      if (!floor) {
        return Result.fail<IFloorDTO>('Floor not found');
      }
      const passages = await Promise.all(floorDTO.passages.map(async floor => {
        return await this.floorRepo.findByID(floor as unknown as Floor["id"]);
      }));

      floor.passages = passages;
      await this.floorRepo.save(floor);
      const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async findByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>> {
    try {
      console.log("Building ID: ", buildingId);
      const floors = await this.floorRepo.findByBuildingId(buildingId);
      return Result.ok<IFloorDTO[]>(floors);
    } catch (e) {
      throw e;
    }
  }

  public async findAll(): Promise<Result<IFloorDTO[]>> {
    try {
      const floors = await this.floorRepo.findAll();
      return Result.ok<IFloorDTO[]>(floors);
    } catch (e) {
      throw e;
    }
  }
}