import Floor from "./floor";
import Building from "./building";


export enum RoomCategory {
  Gabinete = "Gabinete",
  Anfiteatro = "Anfiteatro",
  Laboratório = "Laboratório",
  Outro = "Outro",
}

export default interface Room {
  id: string;
  floor: Floor;
  name: string;
  category: RoomCategory;
  description: string;
  dimension: number[];
}