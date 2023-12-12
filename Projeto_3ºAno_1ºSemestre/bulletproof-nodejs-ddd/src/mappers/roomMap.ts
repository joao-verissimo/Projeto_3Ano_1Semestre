import IRoomDTO from "../dto/IRoomDTO";
import { Mapper } from '../core/infra/Mapper';
import { Room } from "../domain/room";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class roomMap extends Mapper<Room> {
  public static toDTO(room: Room): IRoomDTO {
    return {
      id: room.id.toString(),
      floor: room.floor,
      name: room.name,
      category: room.category,
      description: room.description,
      dimension: room.dimension
    } as IRoomDTO;
  }

  public static async toDomain(dto: IRoomDTO): Promise<Room> {
    const roomTypeOrError = Room.create({
      floor: dto.floor,
      name: dto.name,
      category: dto.category,
      description: dto.description,
      dimension: dto.dimension
    }, new UniqueEntityID(dto.id));

    roomTypeOrError.isFailure ? console.log(roomTypeOrError.error) : '';

    return roomTypeOrError.isSuccess ? roomTypeOrError.getValue() : null;
  }

  public static toPersistence(room: Room): IRoomDTO {
    return {
      id: room.id.toString(),
      floor: room.floor,
      name: room.name,
      category: room.category,
      description: room.description,
      dimension: room.dimension
    };
  }
}
