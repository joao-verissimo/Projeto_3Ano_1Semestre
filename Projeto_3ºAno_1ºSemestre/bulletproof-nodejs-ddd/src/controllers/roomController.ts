import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import IRoomController from './IControllers/IRoomController';
import IRoomService from '../services/IServices/IRoomService';
import config from '../../config';
import IRoomDTO from '../dto/IRoomDTO';

@Service()
export default class roomController implements IRoomController {
    constructor(@Inject(config.services.room.name) private roomServiceInstance: IRoomService) {}

    public async createRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        const roomDto = req.body as IRoomDTO;
        const result = await this.roomServiceInstance.createRoom(roomDto);

        if (result.isSuccess) {
            res.status(201).json(result.getValue());
        } else {
            res.status(400).json({ error: 'Bad Request', message: result.error });
        }
        } catch (error) {
        console.error(error);
        next(error);
        }
    }
}