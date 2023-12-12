import robotType from "./robotType";

export default interface Robot {
    id: string;
    nickname: string;
    type: robotType;
    serialNumber: string;
    description: string;
    isActive: boolean;
  }