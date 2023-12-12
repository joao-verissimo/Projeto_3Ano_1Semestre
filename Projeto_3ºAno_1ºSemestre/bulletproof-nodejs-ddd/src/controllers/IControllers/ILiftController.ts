import { Request, Response, NextFunction } from 'express';

export default interface ILiftController  {
  createLift(req: Request, res: Response, next: NextFunction);
  updateLift(req: Request, res: Response, next: NextFunction);
}