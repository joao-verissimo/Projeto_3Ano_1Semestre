export default interface robotType {
    _id: string;
    designation: string;
    brand: string;
    modelRobot: string;
    task: number; //0 - vigilance 1 - pickup & delivery 2 - both
}