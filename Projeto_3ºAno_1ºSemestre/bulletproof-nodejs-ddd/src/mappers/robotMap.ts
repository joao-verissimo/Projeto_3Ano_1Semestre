import { Mapper } from '../core/infra/Mapper';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IRobotDTO from "../dto/IRobotDTO";
import { Robot } from "../domain/robot";

export class RobotMap extends Mapper<Robot> {
  public static toDTO(robot: Robot): IRobotDTO {
    return {
      id: robot.id.toString(),
      nickname: robot.nickname,
      type: robot.type,
      serialNumber: robot.serialNumber,
      description: robot.description,
      isActive: robot.isActive
    } as IRobotDTO;
  }

  public static async toDomain(dto: IRobotDTO): Promise<Robot> {
    const robotOrError = Robot.create({
        nickname: dto.nickname,
        type: dto.type,
        serialNumber: dto.serialNumber,
        description: dto.description,
        isActive: dto.isActive
    }, new UniqueEntityID(dto.id));

    robotOrError.isFailure ? console.log(robotOrError.error) : '';

    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence(robot: Robot): IRobotDTO {
    return {
        id: robot.id.toString(),
        nickname: robot.nickname,
        type: robot.type,
        serialNumber: robot.serialNumber,
        description: robot.description,
        isActive: robot.isActive
    };
  }
}
