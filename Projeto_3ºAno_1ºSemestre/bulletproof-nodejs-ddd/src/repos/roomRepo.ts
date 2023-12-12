import { Service, Inject } from 'typedi';
import { Model, Document, FilterQuery} from 'mongoose';
import { Room} from '../domain/room';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';
import IRoomRepo from './IRepos/IRoomRepo';
import { roomMap } from "../mappers/roomMap";
import { ObjectId } from 'mongodb';
import IRoomDTO from '../dto/IRoomDTO';

function doRoomsOverlap(roomA: Room, roomB: Room): boolean {
    const roomATopLeft = { x: roomA.dimension[0], y: roomA.dimension[1] };
    const roomABottomRight = { x: roomA.dimension[0] + roomA.dimension[2], y: roomA.dimension[1] + roomA.dimension[3] };
    const roomBTopLeft = { x: roomB.dimension[0], y: roomB.dimension[1] };
    const roomBBottomRight = { x: roomB.dimension[0] + roomB.dimension[2], y: roomB.dimension[1] + roomB.dimension[3] };
  
    return (
      roomATopLeft.x < roomBBottomRight.x &&
      roomABottomRight.x > roomBTopLeft.x &&
      roomATopLeft.y < roomBBottomRight.y &&
      roomABottomRight.y > roomBTopLeft.y
    );
  }

@Service()
export default class RoomRepo implements IRoomRepo {
    buildingsSchema: any;
    floorSchema: any;
  constructor(
    @Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>,
  ) {}
    exists(t: Room): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async save(room: Room): Promise<Room> {
        const existingName = await this.roomSchema.findOne({ name: room.name });
                
        try {
            if (existingName === null) {
                let roomDocument = null;
                if(ObjectId.isValid(room.id.toString())){
                    const query = { _id: room.id };
                    roomDocument = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);
                }

                const roomSameFloor = await this.roomSchema.find({ floor: room.floor.id } as FilterQuery<IRoomPersistence & Document>);
                const roomInstances = roomSameFloor.map((doc: any) => roomMap.toDTO(doc));

                if (roomInstances != null) {
                    const isOverlap = roomInstances.some((otherRoom) => {
                        const tempRoom = {
                            floor: otherRoom.floor,
                            name: otherRoom.name,
                            category: otherRoom.category,
                            description: otherRoom.description,
                            dimension: otherRoom.dimension
                        } as any;
                        return doRoomsOverlap(room, tempRoom);
                    });

                    if (isOverlap) {
                        throw new Error('Room overlaps with existing rooms.');
                    }
                }

                const rawRoom: any = roomMap.toPersistence(room);
                const roomCreated = await this.roomSchema.create(rawRoom) as unknown as IRoomDTO;
                return roomMap.toDomain(roomCreated);
            } else {
                throw new Error('Name is not unique.');
            }
        } catch (err) {
            throw err;
        }
    } 
}