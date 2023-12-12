import { Service, Inject } from 'typedi';
import { Model, Document, FilterQuery } from 'mongoose';
import IRobotPersistance from '../dataschema/IRobotPersistance';
import { Robot } from '../domain/robot';
import { RobotMap } from '../mappers/robotMap';
import IRobotRepo from './IRepos/IRobotRepo';
import { ObjectId } from 'mongodb';

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: Model<IRobotPersistance & Document>;

  constructor(
    @Inject('logger') private logger: any,
    @Inject('robotSchema') private robotSchema: Model<IRobotPersistance & Document>
  ) {}
    exists(t: Robot): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

  async save(robot: Robot): Promise<Robot> {
    let robotDocument = null;
    if(ObjectId.isValid(robot.id.toString())){
      const query = { _id: robot.id };
      robotDocument = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistance & Document>);
    }

    try{
      if(robotDocument === null){
        const [existingNickname, existingSerialNumber] = await Promise.all([
          this.robotSchema.findOne({ nickname: robot.nickname }),
          this.robotSchema.findOne({ serialNumber: robot.serialNumber }),
        ]);
    
        if (existingNickname || existingSerialNumber) {
          throw new Error('Nickname or serial number already exist.');
        }
        
        const rawRobot: any = RobotMap.toPersistence(robot);
        const robotCreated = await this.robotSchema.create(rawRobot);
        return RobotMap.toDomain(robotCreated);
      }else{
        robotDocument.nickname = robot.nickname;
        robotDocument.type = robot.type;
        robotDocument.serialNumber = robot.serialNumber;
        robotDocument.description = robot.description;
        robotDocument.isActive = robot.isActive;
        await robotDocument.save();

        return robot;
      }
    }catch(err){
      throw err;
    }
  }

  async findByDomainId(robotId: Robot["id"] | string): Promise<Robot> {
    const query = { _id: robotId };
    const robotRecord = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistance & Document>);

    if(robotRecord != null){
      return RobotMap.toDomain(robotRecord);
    }else{
      return null;
    }
  }
}