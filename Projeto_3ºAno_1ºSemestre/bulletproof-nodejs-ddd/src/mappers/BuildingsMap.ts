import { Mapper } from '../core/infra/Mapper';
import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from '../domain/building';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class BuildingsMap extends Mapper<Building> {
  public static toDTO(building: Building): IBuildingDTO {
    return {
      id: building.buildingId.toString(),
      name: building.name,
      localizationoncampus: building.localizationoncampus,
      floors: building.floors,
      lifts: building.lifts,
      maxCel: building.maxCel,
    } as IBuildingDTO;
  }

  public static toDomain(dto: IBuildingDTO): Building {
    const buildingOrError = Building.create({
      name: dto.name,
      localizationoncampus: dto.localizationoncampus,
      floors: dto.floors,
      lifts: dto.lifts,
      maxCel: dto.maxCel,
    }, new UniqueEntityID(dto.id));

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building): IBuildingDTO {
    return {
      id: building.id.toString(),
      name: building.name,
      localizationoncampus: building.localizationoncampus,
      floors: building.floors,
      lifts: building.lifts,
      maxCel : building.maxCel,
    };
  }
}