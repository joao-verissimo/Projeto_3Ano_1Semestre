import { Repo } from "../../core/infra/Repo";
import { RobotType } from "../../domain/robotType";
import IRobotTypeDTO from "../../dto/IRobotTypeDTO";

export default interface IRobotTypeRepo extends Repo<RobotType> {
  save(robotType: RobotType): Promise<RobotType>;
  findByDomainId(robotTypeId: RobotType["id"] | string): Promise<RobotType>;
  findByDesignation(des: string): Promise<RobotType>;
  findAll(): Promise<IRobotTypeDTO[]>;
}