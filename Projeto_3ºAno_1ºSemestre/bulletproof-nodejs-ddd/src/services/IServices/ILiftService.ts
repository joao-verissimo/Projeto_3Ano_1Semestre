import { Result } from "../../core/logic/Result";
import ILiftDTO from "../../dto/ILiftDTO";

export default interface ILiftService  {
  createLift(liftDTO: ILiftDTO): Promise<Result<ILiftDTO>>;
  updateLift(liftDTO: ILiftDTO): Promise<Result<ILiftDTO>>;
}