import Container, { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IRoomRepo from '../repos/IRepos/IRoomRepo';
import { Room } from '../domain/room';
import { roomMap } from '../mappers/roomMap';
import IRoomService from './IServices/IRoomService';
import IRoomDTO from '../dto/IRoomDTO';
import IFloorRepo from '../repos/IRepos/IFloorRepo';
import { Floor } from '../domain/floor';

@Service()
export default class roomService implements IRoomService {
  constructor(
      @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
      @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
  ) {}

  public async createRoom(roomDto: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {
      const floor = Container.get<IFloorRepo>(config.repos.floor.name);

      const roomOrError = Room.create ({
        floor: await floor.findByID((roomDto.floor.toString()) as unknown as Floor["id"]),
        name: roomDto.name,
        category: roomDto.category,
        description: roomDto.description,
        dimension: roomDto.dimension
      });

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }
      const roomResult = roomOrError.getValue();
      await this.roomRepo.save(roomResult);
      return Result.ok<IRoomDTO>( roomMap.toDTO(roomResult))
    } catch (e) {
      throw e;
    }
  }
}