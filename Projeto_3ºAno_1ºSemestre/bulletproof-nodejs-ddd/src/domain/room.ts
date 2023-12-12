import { Floor } from "./floor";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

export enum RoomCategory {
    Gabinete = "Gabinete",
    Anfiteatro = "Anfiteatro",
    Laboratório = "Laboratório",
    Outro = "Outro",
}

interface RoomProps {
    floor: Floor;
    name: string;
    category: RoomCategory;
    description: string;
    dimension: number[]; //x,y,width,height
}

export class Room extends AggregateRoot<RoomProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get floor(): Floor {
    return this.props.floor;
  }

  get name(): string {
    return this.props.name;
  }

  get category(): RoomCategory {
    return this.props.category;
  }

  get description(): string {
    return this.props.description;
  }

  get dimension(): number[] {
      return this.props.dimension;
  }

  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(roomProps: RoomProps, id?: UniqueEntityID): Result<Room> {
      const { floor, name, category, description, dimension} = roomProps;

      if (!floor) {
        return Result.fail<Room>("Must provide a valid floor");
      } else if (!name || name.length > 50) {
        return Result.fail<Room>("Must provide a valid name (Max: 50 characters)");
      } else if (!description || description.length > 250) {
        return Result.fail<Room>("Must provide a valid description (Max: 250 characters)");
      } else if (dimension[0] < 0 || dimension[1] < 0 || dimension[2] < 1 || dimension[3] < 1){
        return Result.fail<Room>("Must provide a valid dimensions for the room (Min: 1 cell)");
      } else if(!(Object.values(RoomCategory).includes(category as unknown as RoomCategory))){
        return Result.fail<Room>("Must provide a valid category for the room (Gabinete, Afinteatro, Laboratório, Outro)");
      } else {
        const room1 = new Room(roomProps, id);
        return Result.ok<Room>(room1);
      }
  }
}