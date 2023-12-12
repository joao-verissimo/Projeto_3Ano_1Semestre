import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import { FloorId } from '../domain/floorId';
import { RoomCategory} from '../domain/room';
import IRoomService from '../services/IServices/IRoomService';
import IRoomDTO from '../dto/IRoomDTO';
import roomController from '../controllers/roomController';
import IBuildingDTO from '../dto/IBuildingDTO';
import IFloorDTO from '../dto/IFloorDTO';
import { FloorMap } from '../mappers/FloorMap';
import { Building } from '../domain/building';

describe('RoomRepo', () => {
    const sandbox = sinon.createSandbox();
    const building = Building.create({
        "name": "Building 123",
        "localizationoncampus": "Campus XYZ",
        "floors": 5,
        "lifts": 2,
        "maxCel": [1,2],
      });
    const floorDataPassage: IFloorDTO = {
        "id": "456",
        "building": building.getValue(),
        "name": "Floor 456",
        "description": "This floor offers a beautiful view of the city skyline.",
        "hall": "Main Hall",
        "room": 8,
        "floorMap": "dasdasd",
        "hasElevator": false,
        "passages": []
      };
    const floorarraydatapassage = [floorDataPassage];
    const FloorPassaDomain =  FloorMap.toDomain(floorDataPassage);
    const FloorArray = [FloorPassaDomain];

  beforeEach(function () {
    Container.reset();
    const floorSchemaInstance = require("../persistence/schemas/floorSchema").default;
    Container.set("FloorSchema", floorSchemaInstance);

    const floorRepoClass = require("../repos/floorRepo").default;
    const floorRepoInstance = new floorRepoClass(); 
    Container.set("FloorRepo", floorRepoInstance);

    const floorServiceClass = require("../services/floorService").default;
    const floorServiceInstance = new floorServiceClass(); 
    Container.set("FloorService", floorServiceInstance);

    const FloorRepoClass = require("../repos/floorRepo").default;
    const FloorRepoInstance = new FloorRepoClass();
    Container.set("FloorRepo", FloorRepoInstance);
    
    const buildSchemaInstance = require("../persistence/schemas/buildingsSchema").default;
    Container.set("BuildingsSchema", buildSchemaInstance);

    const buildRepoClass = require("../repos/buildingsRepo").default;
    const buildingRepoInstance = new buildRepoClass();
    Container.set("BuildingsRepo", buildingRepoInstance);

    const buildingsServiceClass = require("../services/buildingsService").default;
    const buildingsServiceInstance = new buildingsServiceClass();
    Container.set("buildingsService", buildingsServiceInstance);

    const roomSchemaInstance = require("../persistence/schemas/roomSchema").default;
    Container.set("RoomSchema", roomSchemaInstance);

    const roomRepoClass = require("../repos/roomRepo").default;
    const roomRepoInstance = new roomRepoClass();
    Container.set("RoomRepo", roomRepoInstance);

    const roomServiceClass = require("../services/roomService").default;
    const roomServiceInstance = new roomServiceClass();
    Container.set("RoomService", roomServiceInstance);
  });

  after(function () {
    sandbox.restore();
  });

  it('should save a room with valid data', async () => {
        const buildingData = {
            "id": "123",
            "name": "Building 123",
            "localizationoncampus": "Campus XYZ",
            "floors": 5,
            "lifts": 2,
            "maxCel": [1,2],
        };

        sinon.stub(Container.get("buildingsService"), "createBuilding").returns( Result.ok<IBuildingDTO>( {
            "id": buildingData.id,
            "name": buildingData.name,
            "localizationoncampus": buildingData.localizationoncampus,
            "floors": buildingData.floors,
            "lifts": buildingData.lifts,
            "maxCel": buildingData.maxCel,
        }));
    
        const floorData = {
            "id": "1",
            "name": "Floor 123",
            "description": "Welcome to floor 123",
            "hall": "dadad",
            "room": 4,
            "floorMap": "dasdada",
            "hasElevator":true,
            "passages": []
        };

        sinon.stub(Container.get("FloorService"), "createFloor").returns( Result.ok<IFloorDTO>( {
            "id": floorData.id,
            "building": building.getValue(),
            "name": floorData.name,
            "description": floorData.description,
            "hall": floorData.hall,
            "room": floorData.room,
            "floorMap": floorData.floorMap,
            "hasElevator": floorData.hasElevator,
            "passages": floorData.passages
        }));

        const roomData = {
            "id": "1",
            "building": buildingData,
            "floor": floorData,
            "name": "B409",
            "category": RoomCategory.Gabinete,
            "description": "aaaaaa",
            "dimension": [1,1,1,1]
        };

        const req: Partial<Request> = {};
        req.body = roomData;
    
        const res: Partial<Response> = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
        
        const next: Partial<NextFunction> = () => {};

        const roomServiceInstance = Container.get("RoomService");

        const expectedResult : IRoomDTO = {
            "id" : req.body.id,
            "floor" : req.body.floor,
            "name" : req.body.name,
            "category" : req.body.category,
            "description" : req.body.description,
            "dimension" : req.body.dimension
        }

        sinon.stub(roomServiceInstance, "createRoom").returns(Result.ok(expectedResult));
        const ctrl2 = new roomController(roomServiceInstance as IRoomService);
        await ctrl2.createRoom(<Request>req, <Response>res, <NextFunction>next);

        // Assertions
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(expectedResult));
    });
});