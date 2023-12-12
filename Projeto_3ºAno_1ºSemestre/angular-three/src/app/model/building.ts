export default interface Building {
  _id: string;
  name: string;
  localizationoncampus: string;
  floors: number;
  lifts: number;
  maxCel: number[];
}