import { Request, Response, NextFunction } from 'express';

export default interface IFloorController {
    createFloor(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateFloor(req: Request, res: Response, next: NextFunction);
    patchFloorMap(req: Request, res: Response, next: NextFunction);
    patchPassageBuilding(req: Request, res: Response, next: NextFunction);
    listAllFloorsInBuilding(req: Request, res: Response, next: NextFunction) : Promise<void>;
    listAllFloors(req: Request, res: Response, next: NextFunction): Promise<void>;
}
