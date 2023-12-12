import Container, { Service, Inject } from 'typedi';
import config from "../../config";
import ILiftDTO from '../dto/ILiftDTO';
import ILiftRepo from '../repos/IRepos/ILiftRepo';
import ILiftService from './IServices/ILiftService';
import { Result } from "../core/logic/Result";
import { LiftMap } from "../mappers/LiftMap";
import IBuildingsService from './IServices/IBuildingsService';
import { Lift } from '../domain/lift';
import { BuildingId } from '../domain/buildingId';

@Service()
export default class LiftService implements ILiftService {
  buildingRepo: any;
  constructor(
    @Inject(config.repos.lift.name) private liftRepo: ILiftRepo
  ) {}

  public async getLift(liftId: string): Promise<Result<ILiftDTO>> {
    try {
      const lift = await this.liftRepo.findByDomainId(liftId);

      if (lift === null) {
        return Result.fail<ILiftDTO>("Lift not found");
      } else {
        const liftDTOResult = LiftMap.toDTO(lift) as ILiftDTO;
        return Result.ok<ILiftDTO>(liftDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  
  public async createLift(liftDTO: ILiftDTO): Promise<Result<ILiftDTO>> {
    try {
      const buildingsrv = Container.get<IBuildingsService>(config.services.buildings.name);

      const liftOrError = Lift.create ({
        localization: liftDTO.localization,
        state: liftDTO.state,
        building: await buildingsrv.findByDomainId((liftDTO.building.toString()) as unknown as BuildingId)
      });

      if (liftOrError.isFailure){
        throw Result.fail<ILiftDTO>(liftOrError.errorValue());
      }

      const liftResult = liftOrError.getValue();
      await this.liftRepo.save(liftResult); 
      return Result.ok<ILiftDTO>(LiftMap.toDTO(liftResult));
    } catch (e) {
      throw e;
    }
  }

  public async updateLift(liftDTO: ILiftDTO): Promise<Result<ILiftDTO>> {
    try {
      const lift = await this.liftRepo.findByDomainId(liftDTO.id);

      if (lift === null) {
        return Result.fail<ILiftDTO>("Lift not found");
      } else {
        lift.localization = liftDTO.localization;
        lift.state = liftDTO.state;
        lift.building = liftDTO.building;

        await this.liftRepo.save(lift);

        const liftDTOResult = LiftMap.toDTO(lift) as ILiftDTO;
        return Result.ok<ILiftDTO>(liftDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}
