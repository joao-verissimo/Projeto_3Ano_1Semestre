import IRobotTypeDTO from '../../dto/IRobotTypeDTO';
import { Result } from '../../core/logic/Result';
import IRobotDTO from '../../dto/IRobotDTO';

export default interface IRobotService {
  createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
  addRobot(robot: IRobotDTO): Promise<Result<IRobotDTO>>;
  changeRobotState(robot: IRobotDTO): Promise<Result<IRobotDTO>>;
  listAllRobotTypes(): Promise<Result<IRobotTypeDTO[]>>;
}
