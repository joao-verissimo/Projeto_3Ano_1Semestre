import { Result } from "../../core/logic/Result";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomService  {
    createRoom(roomDto: IRoomDTO): Promise<Result<IRoomDTO>>;
}