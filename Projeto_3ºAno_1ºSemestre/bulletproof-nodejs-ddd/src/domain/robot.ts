import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { RobotType } from "./robotType";

interface RobotProps {
  nickname: string;
  type: RobotType;
  serialNumber: string;
  description: string;
  isActive: boolean;
}

export class Robot extends AggregateRoot<RobotProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get nickname(): string {
    return this.props.nickname;
  }

  get type(): RobotType {
    return this.props.type;
  }

  get serialNumber(): string {
    return this.props.serialNumber;
  }

  get description(): string {
    return this.props.description;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  set isActive ( value: boolean) {
    this.props.isActive = value;
  }

  private constructor(props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(robotProps: RobotProps, id?: UniqueEntityID): Result<Robot> {
    const { nickname, type, serialNumber, description} = robotProps;

    if (!nickname || nickname.length === 0 || nickname.length > 30) {
      return Result.fail<Robot>("Must provide a valid nickname");
    } else if (!type) {
      return Result.fail<Robot>("Must provide a valid robot type");
    } else if (!serialNumber || serialNumber.length === 0 || serialNumber.length > 50) {
      return Result.fail<Robot>("Must provide a valid serial number");
    } else if (!description || description.length === 0 || description.length > 250) {
      return Result.fail<Robot>("Must provide a valid description");
    } else {
      robotProps.isActive = robotProps.isActive;
      const robot = new Robot(robotProps, id);
      return Result.ok<Robot>(robot);
    }
  }
}