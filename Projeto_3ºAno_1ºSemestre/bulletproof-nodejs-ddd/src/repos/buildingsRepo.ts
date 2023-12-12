import { Service, Inject } from 'typedi';

import { Building } from "../domain/building";
import { BuildingId } from "../domain/buildingId";
import { BuildingsMap } from "../mappers/BuildingsMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingsPersistence } from '../dataschema/IBuildingsPersistence';
import IBuildingsRepo from './IRepos/IBuildingsRepo';
import IBuildingDTO from '../dto/IBuildingDTO';
import { ObjectId } from 'mongodb';

@Service()
export default class BuildingsRepo implements IBuildingsRepo {
  private models: any;

  constructor(
    @Inject('buildingsSchema') private buildingsSchema: Model<IBuildingsPersistence & Document>,
    @Inject('floorSchema') private floorSchema: Model<IBuildingsPersistence & Document>,
  ) {}
  async findByFloors(minFloors: number, maxFloors: number): Promise<IBuildingDTO[]> {
    try {
      const query: FilterQuery<IBuildingsPersistence & Document> = {
        floors: { $gte: minFloors, $lte: maxFloors },
      };
  
      const buildingDocuments = await this.buildingsSchema.find(query);
      return buildingDocuments;
    } catch (err) {
      console.error('Error in findByFloors:', err);
      throw err;
    }
  }
  
  
  async findByName(name: string): Promise<Building | null> {
    try {
      const query: FilterQuery<IBuildingsPersistence & Document> = { name };
      const buildingDocument = await this.buildingsSchema.findOne(query);
  
      if (buildingDocument) {
        return BuildingsMap.toDomain(buildingDocument);
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
  
  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(building: Building): Promise<boolean> {
    const idX = building.id instanceof BuildingId ? (<BuildingId>building.id).toValue() : building.id;

    const query = { domainId: idX };
    const buildingDocument = await this.buildingsSchema.findOne(query as FilterQuery<IBuildingsPersistence & Document>);

    return !!buildingDocument === true;
  }

  public async save(building: Building): Promise<Building> {    
    let buildingDocument = null;
    if(ObjectId.isValid(building.id.toString())){
      const query = { _id: building.id };
      buildingDocument = await this.buildingsSchema.findOne(query);
    }

    try {
      if (buildingDocument === null) {
        const rawBuilding: any = BuildingsMap.toPersistence(building);
        const buildingCreated = await this.buildingsSchema.create(rawBuilding) as unknown as IBuildingDTO;
        return BuildingsMap.toDomain(buildingCreated);
      } else {
        buildingDocument.name = building.name;
        buildingDocument.localizationoncampus = building.localizationoncampus;
        buildingDocument.floors = building.floors;
        buildingDocument.lifts = building.lifts;
        buildingDocument.maxCel = building.maxCel;
        await buildingDocument.save();

        return building;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(buildingId: BuildingId | string): Promise<Building> {
    const query = { _id: buildingId };
    const buildingRecord = await this.buildingsSchema.findOne(query as FilterQuery<IBuildingsPersistence & Document>);
  
    if (buildingRecord != null) {
      return BuildingsMap.toDomain(buildingRecord);
    } else {
      throw new Error(`Building record with ID ${buildingId} not found.`);
    }
  }

  async findAll(): Promise<Building[]> {
    try {
      const building = await this.buildingsSchema.find() as Building[];
      return building;
    } catch (error) {
      throw error;
    }
  }
}