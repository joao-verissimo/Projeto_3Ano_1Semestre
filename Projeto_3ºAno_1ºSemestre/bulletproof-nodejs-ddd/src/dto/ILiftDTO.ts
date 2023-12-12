import { Building } from "../domain/building";

export default interface ILiftDTO {
  	id: string;
	localization: string;
	state: string;
	building: Building;
}
