import { Request, Response, NextFunction } from 'express';

export default interface IBuildingsController {
  createBuilding(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateBuilding(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAll(req: Request,res: Response, next: NextFunction):Promise<void>;
  listBuildingsByFloors(req: Request, res: Response, next: NextFunction);
}
