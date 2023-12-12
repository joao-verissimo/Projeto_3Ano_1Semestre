import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

interface RobotTypeProps {
  designation: string;
  brand: string;
  modelRobot: string;
  task: number; //0 - vigilance 1 - pickup & delivery 2 - both
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get designation(): string {
    return this.props.designation;
  }

  get brand(): string {
    return this.props.brand;
  }

  get modelRobot(): string {
    return this.props.modelRobot;
  }

  get task(): number {
    return this.props.task;
  }

  private constructor(props: RobotTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(robotTypeProps: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {
    const { designation, brand, modelRobot, task} = robotTypeProps;

    if (!designation || designation.length === 0) {
      return Result.fail<RobotType>("Must provide a designation for the robot type");
    } else if (task < 0 || task > 3) {
      return Result.fail<RobotType>("Must provide a valid task");
    } else if (!brand || brand.length === 0) {
      return Result.fail<RobotType>("Must provide the brand of the robot");
    } else if (!modelRobot || modelRobot.length === 0) {
      return Result.fail<RobotType>("Must provide the model of the robot");
    } else {
      const robotType = new RobotType(robotTypeProps, id);
      return Result.ok<RobotType>(robotType);
    }
  }
}