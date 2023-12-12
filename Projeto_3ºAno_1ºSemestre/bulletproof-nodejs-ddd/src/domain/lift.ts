import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Building } from "./building";

interface LiftProps {
	localization: string;
	state: string;
	building: Building;
}

export class Lift extends AggregateRoot<LiftProps> {

  set localization ( value: string) {
    this.props.localization = value;
  }
  set state ( value: string) {
    this.props.state = value;
  }
  set building ( value: Building) {
    this.props.building = value;
  }

  get id (): UniqueEntityID {
    return this._id;
  }

  get localization(): string {
    return this.props.localization;
  }

  get state(): string {
    return this.props.state;
  }

  get building(): Building {
    return this.props.building;
  }

  private constructor (props: LiftProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(lift: LiftProps, id?: UniqueEntityID): Result<Lift> {
    const {localization,state,building } = lift;
  
    if (!localization || localization.trim() === "") {
      return Result.fail<Lift>('Must provide a lift localization');
    }else if (!state || state.trim() === "") {
      return Result.fail<Lift>('Must provide a lift state');
    }else if (!building) {
      return Result.fail<Lift>('Must provide a lift building');
    }else{
      const lift1 = new Lift(lift, id);
      return Result.ok<Lift>(lift1);
    }
  }
}