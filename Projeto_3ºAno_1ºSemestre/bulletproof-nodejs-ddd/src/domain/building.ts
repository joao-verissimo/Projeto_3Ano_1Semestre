import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { BuildingId } from "./buildingId"; // Define this class if necessary

interface BuildingProps {
  name: string;
  localizationoncampus: string;
  floors: number;
  lifts: number;
  maxCel: number[];
}

export class Building extends AggregateRoot<BuildingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get maxCel(): number[] {
    return this.props.maxCel;
  }
  get buildingId(): BuildingId {
    return this.id;
  }

  get name(): string {
    return this.props.name;
  }

  get localizationoncampus(): string {
    return this.props.localizationoncampus;
  }

  get floors(): number {
    return this.props.floors;
  }

  get lifts(): number {
    return this.props.lifts;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set localizationoncampus(value: string) {
    this.props.localizationoncampus = value;
  }

  set floors(value: number) {
    this.props.floors = value;
  }

  set lifts(value: number) {
    this.props.lifts = value;
  }

  set maxCel(value: number[]) {
    this.props.maxCel = value;
  }


  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(buildingProps: BuildingProps, id?: UniqueEntityID): Result<Building> {
    const { name, localizationoncampus, floors, lifts, maxCel, } = buildingProps;
  
    if (!name || name.length === 0) {
      return Result.fail<Building>("Must provide a building name");
    } else if (!localizationoncampus || localizationoncampus.length === 0) {
      return Result.fail<Building>("Must provide a building localization on campus");
    } else if (floors <= 0) {
      return Result.fail<Building>("Number of floors must be greater than 0");
    } else if (lifts < 0) {
      return Result.fail<Building>("Number of lifts cannot be negative");
    } else if (!maxCel || maxCel.length === 0) {  // Check if maxCel is defined
      return Result.fail<Building>("Must provide a maxCel");
    } else {
      const building = new Building(buildingProps, id);
      return Result.ok<Building>(building);
    }
  }
  
}
