import Container, { Service, Inject } from 'typedi';

import IRobotService from './IServices/IRobotService';
import IRobotTypeRepo from '../repos/IRepos/IRobotTypeRepo';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';

import { RobotType } from '../domain/robotType';
import { Result } from '../core/logic/Result';
import IRobotDTO from '../dto/IRobotDTO';
import { Robot } from '../domain/robot';
import IRobotRepo from '../repos/IRepos/IRobotRepo';
import { RobotMap } from '../mappers/robotMap';
import config from '../../config';

@Service()
export default class robotService implements IRobotService {
  constructor(
    @Inject('logger') private logger,
    @Inject(config.repos.robotType.name) private robotTypeRepo: IRobotTypeRepo,
    @Inject(config.repos.robot.name) private robotRepo: IRobotRepo,
  ) { }

  public async changeRobotState(robot: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const existingRobot = await this.robotRepo.findByDomainId(robot.id);
      existingRobot.isActive = !existingRobot.isActive;
      
      await this.robotRepo.save(existingRobot);
      const robotDTOResult = RobotMap.toDTO(existingRobot) as IRobotDTO;
      return Result.ok<IRobotDTO>(robotDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
    try {
      const existingRobotType = await this.robotTypeRepo.findByDesignation(robotTypeDTO.designation);

      if (existingRobotType) {
        return Result.fail('Robot type with the same designation already exists');
      }

      const robotTypeOrError = RobotType.create({
        designation: robotTypeDTO.designation,
        brand: robotTypeDTO.brand,
        modelRobot: robotTypeDTO.modelRobot,
        task: robotTypeDTO.task
      });

      if (robotTypeOrError.isFailure) {
        throw Result.fail<IRobotTypeDTO>(robotTypeOrError.errorValue());
      }

      const robotTypeResult = robotTypeOrError.getValue();
      await this.robotTypeRepo.save(robotTypeResult);
      return Result.ok<IRobotTypeDTO>(robotTypeDTO);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async addRobot(robot: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const type = await this.robotTypeRepo.findByDomainId(robot.type.id);

      const robotOrError = Robot.create({
        nickname: robot.nickname,
        isActive: robot.isActive,
        type: type,
        serialNumber: robot.serialNumber,
        description: robot.description
      });

      if (robotOrError.isFailure) {
        throw Result.fail<IRobotDTO>(robotOrError.errorValue());
      }

      const robotResult = robotOrError.getValue();
      await this.robotRepo.save(robotResult);

      return Result.ok<IRobotDTO>(RobotMap.toDTO(robotResult));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async listAllRobotTypes(): Promise<Result<IRobotTypeDTO[]>> {
    try {
      const rt = await this.robotTypeRepo.findAll();
      return Result.ok<IRobotTypeDTO[]>(rt);
    } catch (e) {
      throw e;
    }
  }
}