import { Container } from 'typedi';
import {Mapper} from '../core/infra/Mapper';
import { Floor } from '../domain/floor';
import IFloorDTO from '../dto/IFloorDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { BuildingsMap } from './BuildingsMap';

export class FloorMap extends Mapper<Floor> {
  public static toDTO(floor: Floor): IFloorDTO {
    return {
      id: floor.id.toString(),
      name: floor.name,
      building: floor.building,
      description: floor.description,
      hall: floor.hall,
      room: floor.room,
      floorMap: floor.floorMap,
      hasElevator: floor.hasElevator,
      passages: floor.passages,
    } as IFloorDTO;
  }

  public static toDomain(dto: IFloorDTO): Floor {
    const florOrError = Floor.create( {
      name: dto.name,
      building: dto.building,
      description: dto.description,
      hall: dto.hall,
      room: dto.room,
      floorMap: dto.floorMap,
      hasElevator: dto.hasElevator,
      passages: []
    }, new UniqueEntityID(dto.id));
    florOrError.isFailure ? console.log(florOrError.error) : '';

    return florOrError.isSuccess ? florOrError.getValue() : null;
  }

  public static toPersistence(floor: Floor): IFloorDTO {
    return {
      id: floor.id.toString(),
      building: floor.building,
      name: floor.name,
      description: floor.description,
      hall: floor.hall,
      room: floor.room,
      floorMap: floor.floorMap,
      hasElevator: floor.hasElevator,
      passages: floor.passages
    };
  }
}
