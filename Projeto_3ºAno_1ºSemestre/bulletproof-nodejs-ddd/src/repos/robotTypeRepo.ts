import { Service, Inject } from 'typedi';
import { RobotType } from '../domain/robotType';
import { Model, Document, FilterQuery } from 'mongoose';
import { IRobotTypePersistance } from '../dataschema/IRobotTypePersistance';
import { RobotTypeMap } from '../mappers/robotTypeMap';
import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import { ObjectId } from 'mongodb';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import IRobotDTO from '../dto/IRobotDTO';

@Service()
export default class RobotTypeRepo implements IRobotTypeRepo {
  constructor(
    @Inject('logger') private logger: any,
    @Inject('robotTypeSchema') private robotTypeSchema: Model<IRobotTypePersistance & Document>
  ) {}
  exists(t: RobotType): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async save(robotType: RobotType): Promise<RobotType> {
    let robotTypeDocument = null;
    if(ObjectId.isValid(robotType.id.toString())){
      const query = { _id: robotType.id };
      robotTypeDocument = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistance & Document>);
    }

    try{
      if(robotTypeDocument === null){
        const rawRobotType: any = RobotTypeMap.toPersistence(robotType);
        const robotTypeCreated = await this.robotTypeSchema.create(rawRobotType);
        return RobotTypeMap.toDomain(robotTypeCreated);
      }else{
        robotTypeDocument.designation = robotType.designation;
        robotTypeDocument.brand = robotType.brand;
        robotTypeDocument.modelRobot = robotType.modelRobot;
        robotTypeDocument.task = robotType.task;
        await robotTypeDocument.save();

        return robotType;
      }
    }catch(err){
      throw err;
    }

  }

  async findAll(): Promise<IRobotTypeDTO[]> {
    try {
      const rt = await this.robotTypeSchema.find() as IRobotTypeDTO[];
      return rt;
    } catch (error) {
      throw error;
    }
  }
  
  async findByDomainId(robotTypeId: RobotType["id"] | string): Promise<RobotType> {
    const query = { domainId: robotTypeId };
    const robotTypeRecord = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistance & Document>);

    if(robotTypeRecord != null){
      return RobotTypeMap.toDomain(robotTypeRecord);
    }else{
      return null;
    }
  }

  async findByDesignation(des: string): Promise<RobotType> {
    const query = {designation: des};
    const robotTypeRecord = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistance & Document>);

    if(robotTypeRecord != null){
      return RobotTypeMap.toDomain(robotTypeRecord);
    }else{
      return null;
    }
  }
}