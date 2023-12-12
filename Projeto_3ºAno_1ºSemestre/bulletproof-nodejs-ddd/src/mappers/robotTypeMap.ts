import { RobotType } from "../domain/robotType";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import { Mapper } from '../core/infra/Mapper';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RobotTypeMap extends Mapper<RobotType> {
  public static toDTO(robotType: RobotType): IRobotTypeDTO {
    return {
      id: robotType.id.toString(),
      designation: robotType.designation,
      brand: robotType.brand,
      modelRobot: robotType.modelRobot,
      task: robotType.task
    } as IRobotTypeDTO;
  }

  public static async toDomain(dto: IRobotTypeDTO): Promise<RobotType> {
    const robotTypeOrError = RobotType.create({
      designation: dto.designation,
      brand: dto.brand,
      modelRobot: dto.modelRobot,
      task: dto.task
    }, new UniqueEntityID(dto.id));

    robotTypeOrError.isFailure ? console.log(robotTypeOrError.error) : '';

    return robotTypeOrError.isSuccess ? robotTypeOrError.getValue() : null;
  }

  public static toPersistence(robotType: RobotType): IRobotTypeDTO {
    return {
      id: robotType.id.toString(),
      designation: robotType.designation,
      brand: robotType.brand,
      modelRobot: robotType.modelRobot,
      task: robotType.task
    };
  }
}
