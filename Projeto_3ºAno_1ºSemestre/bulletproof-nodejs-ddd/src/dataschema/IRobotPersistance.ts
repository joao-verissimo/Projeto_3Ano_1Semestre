import { RobotType } from "../domain/robotType";

export default interface IRobotPersistance {
    id: string;
    nickname: string;
    type: RobotType;
    serialNumber: string;
    description: string;
    isActive: boolean;
}