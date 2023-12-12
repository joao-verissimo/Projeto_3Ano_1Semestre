export interface IRobotTypePersistance {
    id: string;
    designation: string;
    brand: string;
    modelRobot: string;
    task: number; //0 - vigilance 1 - pickup & delivery 2 - both
}