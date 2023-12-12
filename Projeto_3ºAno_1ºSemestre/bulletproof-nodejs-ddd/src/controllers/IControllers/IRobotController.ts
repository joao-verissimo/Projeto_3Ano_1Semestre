import { Request, Response, NextFunction } from 'express';

export default interface IRobotController {
  createRobotType(req: Request, res: Response, next: NextFunction): Promise<void>;
  addRobot(req: Request, res: Response, next: NextFunction): Promise<void>;
  changeRobotState(req: Request, res: Response, next: NextFunction): Promise<void>;
  listAllRobotTypes(req: Request, res: Response, next: NextFunction): Promise<void>;
}