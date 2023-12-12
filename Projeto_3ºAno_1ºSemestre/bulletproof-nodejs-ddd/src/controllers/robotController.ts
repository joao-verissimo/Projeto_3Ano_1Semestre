import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';

import IRobotController from './IControllers/IRobotController';
import RobotService from '../services/IServices/IRobotService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import IRobotDTO from '../dto/IRobotDTO';

@Service()
export default class robotController implements IRobotController {
  constructor(
    @Inject(config.services.robot.name) private robotService: RobotService
  ) {}

  public async changeRobotState(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const robotChangeStateOrError = await this.robotService.changeRobotState(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (robotChangeStateOrError.isFailure) {
        res.status(400).send();
      } else {
        const robotTypeDTO = robotChangeStateOrError.getValue();
        res.status(201).json(robotTypeDTO);
      }
    } catch (e) {
      next(e);
    }
  }

  public async createRobotType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const robotTypeOrError = await this.robotService.createRobotType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;

      if (robotTypeOrError.isFailure) {
        res.status(400).send();
      } else {
        const robotTypeDTO = robotTypeOrError.getValue();
        res.status(201).json(robotTypeDTO);
      }
    } catch (e) {
      next(e);
    }
  }

  public async addRobot(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const robotOrError = await this.robotService.addRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
        res.status(402).send();
      } else {
        const robotDTO = robotOrError.getValue();
        res.status(201).json(robotDTO);
      }
    } catch (e) {
      next(e);
    }
  }

  public async listAllRobotTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const robotOrError = await this.robotService.listAllRobotTypes();

      if (robotOrError.isFailure) {
        res.status(402).send();
      } else {
        const robotDTO = robotOrError.getValue();
        res.status(201).json(robotDTO);
      }
    } catch (e) {
      next(e);
    }
  }
}