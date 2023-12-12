import Building from "./building";

export default interface Lift {
	id: string;
	localization: string;
	state: string;
	building: Building;
}