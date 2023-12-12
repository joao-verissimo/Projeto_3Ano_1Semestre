import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../config";
import { Result } from '../core/logic/Result';
import IBuildingDTO from '../dto/IBuildingDTO';
import BuildingsController from './buildingsController';
import IBuildingService from '../services/IServices/IBuildingsService';
import buildingService from '../services/buildingsService';
import IFloorDTO from '../dto/IFloorDTO';
import { FloorMap } from '../mappers/FloorMap';
import { Building } from '../domain/building';

describe('BuildingsController (Integration Test)', function () {
    beforeEach(function () {
        const buildingServiceName = config.services.buildings.name;
        const buildingRepoName = config.repos.name;

        const buildingServiceClass = require(config.services.buildings.path).default;
        const buildingRepoClass = require(config.repos.buildings.path).default;

        Container.set(buildingServiceName, new buildingServiceClass());
        Container.set(buildingRepoName, new buildingRepoClass());
      
    });

    it('createBuilding: returns JSON with id+name values', async function () {
      const body = {
          "id": "123",
          "name": "Building 123", // Make sure 'name' is defined
          "localizationoncampus": "Campus XYZ",
          "floors": 5,
          "lifts": 2,
          "maxCel": [1,2],
        };
        
    
        const req: Partial<Request> = {};
        req.body = body;
    
        const res: Partial<Response> = {
          json: sinon.spy(),
          status: sinon.stub().returnsThis(),
        };
        
        const next: Partial<NextFunction> = () => {};
    
        // Mock the building service
        const buildingServiceInstance = Container.get(buildingService);
    
        // Stub the createBuilding method to return a predefined result
        const expectedResult: IBuildingDTO = {
          "id": req.body.id,
          "name": req.body.name,
          "localizationoncampus": req.body.localizationoncampus,
          "floors": req.body.floors,
          "lifts": req.body.lifts,
          "maxCel": req.body.maxCel,
        };
    
        sinon.stub(buildingServiceInstance, "createBuilding").returns( Result.ok<IBuildingDTO>( {
            "id": req.body.id,
            "name": req.body.name,
            "localizationoncampus": req.body.localizationoncampus,
            "floors": req.body.floors,
            "lifts": req.body.lifts,
            "maxCel": req.body.maxCel,
        }));
    
        const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);
    
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);
    
        // Assertions
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(expectedResult));
      });

    it('findAll: returns an array of building names', async function () {
        const buildingNames = ['Building 1', 'Building 2'];

        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            json: sinon.spy(),
        };
        const next: Partial<NextFunction> = () => {};

        // Mock the building service
        const buildingServiceClass = require(config.services.buildings.path).default;
        const buildingServiceInstance = new buildingServiceClass();
        Container.set(config.services.buildings.name, buildingServiceInstance);

        // Stub the findAll method to return predefined result
        sinon.stub(buildingServiceInstance, 'findAll').resolves(buildingNames);

        const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);
        await ctrl.findAll(<Request>req, <Response>res, <NextFunction>next);

        // Assertions
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, buildingNames);
    });

    it('getAllFloorsInBuilding: returns an array of floors for a specific building ID', async function () {
      const buildingId = '123'; // Use a specific building ID
      const floorsForBuilding = [
        { id: '1', name: 'Floor 1' },
        { id: '2', name: 'Floor 2' },
      ];
    
      const req: Partial<Request> = {
        params: { buildingId },
      };
    
      const res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };
    
      const next: Partial<NextFunction> = () => {};
    
      // Mock the building service
      const buildingServiceInstance = Container.get(config.services.buildings.name);
      // Stub the getAllFloorsInBuilding method to return the predefined array of floors
      sinon.stub(buildingServiceInstance, 'getAllFloorsInBuilding').resolves(floorsForBuilding);
    
      const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);
    
      await ctrl.listAllFloorsInBuilding(<Request>req, <Response>res, <NextFunction>next);
    
      // Assertions
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, floorsForBuilding);
    
      // Specific assertions
      sinon.assert.calledWith(res.json, sinon.match.array); // Ensure it returns an array
      sinon.assert.calledWith(res.json, sinon.match.has('length', floorsForBuilding.length)); // Check if the correct number of floors is returned
    
      // Check specific floor properties
      sinon.assert.calledWithMatch(res.json, [
        sinon.match({ id: '1', name: 'Floor 1' }),
        sinon.match({ id: '2', name: 'Floor 2' }),
      ]);
    });
    
    it('ListBuildingFloorWithPassageToOtherBuilding: returns an array of floors for a specific building ID with passages', async function () {
      const building = Building.create({
        "name": "Building 1",
        "localizationoncampus": "Campus XYZ",
        "floors": 5,
        "lifts": 2,
        "maxCel": [1,2],
      });
      const building2 = Building.create ({
        "name": "Building 2",
        "localizationoncampus": "Campus XYZ",
        "floors": 5,
        "lifts": 2,
        "maxCel": [1,2],
      });
      // Mock IFloorDTO entities for passages
      const mockPassageFloorDTOs: IFloorDTO[] = [
          {
              id: 'passage1',
              building: building.getValue(),
              name: 'Passage 1',
              description: 'Description for Passage 1',
              hall: 'Hall X',
              room: 5,
              floorMap: 'floorMapPassage1',
              hasElevator: false,
              passages: [] // empty because it's a passage floor without further passages
          },
          {
              id: 'passage2',
              building: building.getValue(),
              name: 'Passage 2',
              description: 'Description for Passage 2',
              hall: 'Hall Y',
              room: 6,
              floorMap: 'floorMapPassage2',
              hasElevator: false,
              passages: [] // empty because it's a passage floor without further passages
          }
      ];
  
      // Convert mockPassageFloorDTOs to Floor entities
      const mockPassageFloors = mockPassageFloorDTOs.map(FloorMap.toDomain);
  
      const mockFloorsWithPassagesDTO: IFloorDTO[] = [
          {
              id: '1',
              building: building2.getValue(),
              name: 'Floor 1 with Passage',
              description: 'Description for Floor 1',
              hall: 'Hall A',
              room: 10,
              floorMap: 'floorMap1',
              hasElevator: true,
              passages: [mockPassageFloors[0]]
          },
          {
              id: '3',
              building: building2.getValue(),
              name: 'Floor 3',
              description: 'Description for Floor 3',
              hall: 'Hall C',
              room: 15,
              floorMap: 'floorMap3',
              hasElevator: true,
              passages: [mockPassageFloors[1]]
          }
      ];
      const req: Partial<Request> = {
          params: { id: '1234' },
      };
  
      const res: Partial<Response> = {
          json: sinon.spy(),
          status: sinon.stub().returnsThis(),
      };
  
      const next: Partial<NextFunction> = () => {};
  
      // Mock the building service
      const buildingServiceInstance = Container.get(config.services.buildings.name);
      
      // Stub the ListBuildingFloorWithPassageToOtherBuilding method to return the predefined floors with passages DTO
      sinon.stub(buildingServiceInstance, 'ListBuildingFloorWithPassageToOtherBuilding').resolves(mockFloorsWithPassagesDTO);
  
      const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);
  
      await ctrl.ListBuildingFloorWithPassageToOtherBuilding(<Request>req, <Response>res, <NextFunction>next);
  
      // Assertions
      sinon.assert.calledOnce(res.json);
  });
  
});
