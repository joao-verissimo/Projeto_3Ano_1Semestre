import { Repo } from "../../core/infra/Repo";
import { Lift } from "../../domain/lift";
import { liftId } from "../../domain/liftID";

export default interface ILiftRepo extends Repo<Lift> {
  save(Lift: Lift): Promise<Lift>;
  findByDomainId (roleId: liftId | string): Promise<Lift>;

}