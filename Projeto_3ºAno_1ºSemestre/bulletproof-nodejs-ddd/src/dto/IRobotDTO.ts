import { RobotType } from "../domain/robotType";

export default interface IRobotDTO {
    id: string;
    nickname: string;
    type: RobotType;
    serialNumber: string;
    description: string;
    isActive: boolean;
}