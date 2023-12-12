import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ILiftController from "./IControllers/ILiftController";
import ILiftService from '../services/IServices/ILiftService';
import ILiftDTO from '../dto/ILiftDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class liftController implements ILiftController {
  constructor(
      @Inject(config.services.lift.name) private liftServiceInstance : ILiftService
  ) {}

  public async createLift(req: Request, res: Response, next: NextFunction) {
    try {
      const liftOrError = await this.liftServiceInstance.createLift (req.body as ILiftDTO) as Result<ILiftDTO>;
        
      if (liftOrError.isFailure) {
        return res.status(402).send();
      }

      const roleDTO = liftOrError.getValue();
      return res.json( roleDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateLift(req: Request, res: Response, next: NextFunction) {
    try {
      const liftOrError = await this.liftServiceInstance.updateLift(req.body as ILiftDTO) as Result<ILiftDTO>;

      if (liftOrError.isFailure) {
        return res.status(404).send();
      }

      const roleDTO = liftOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}