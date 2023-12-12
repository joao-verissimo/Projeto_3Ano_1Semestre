import { Floor } from '../domain/floor';
import { RoomCategory } from '../domain/room';

export interface IRoomPersistence {
    id: string;
    floor: Floor;
    name: string;
    category: RoomCategory;
    description: string;
    dimension: number[];
}