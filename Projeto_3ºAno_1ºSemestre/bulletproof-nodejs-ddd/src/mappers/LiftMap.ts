import { Mapper } from "../core/infra/Mapper";
import ILiftDTO from "../dto/ILiftDTO";
import { Lift } from "../domain/lift";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class LiftMap extends Mapper<Lift> {
  public static toDTO(lift: Lift): ILiftDTO {
    return {
      id: lift.id.toString(),
      localization: lift.localization,
      state: lift.state,
      building: lift.building,
    } as ILiftDTO;
  }

  public static toDomain(dto: ILiftDTO): Lift {
    const liftOrError = Lift.create({
      localization: dto.localization,
      state: dto.state,
      building: dto.building
    }, new UniqueEntityID(dto.id));

    liftOrError.isFailure ? console.log(liftOrError.error) : '';
    return liftOrError.isSuccess ? liftOrError.getValue() : null;
  }

  public static toPersistence(lift: Lift): ILiftDTO {
    return {
      id: lift.id.toString(),
      localization: lift.localization,
      state: lift.state,
      building: lift.building
    };
  }
}