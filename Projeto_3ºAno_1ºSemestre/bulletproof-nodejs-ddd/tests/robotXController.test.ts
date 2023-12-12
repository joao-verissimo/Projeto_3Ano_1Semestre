import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import IRobotTypeDTO from '../src/dto/IRobotTypeDTO';
import { Result } from '../src/core/logic/Result';
import IRobotService from '../src/services/IServices/IRobotService';
import robotController from '../src/controllers/robotController';
import IRobotDTO from '../src/dto/IRobotDTO';

describe('RobotController (Unit Test)', function () {
    const sandbox = sinon.createSandbox();
  
      beforeEach(function() {
        Container.reset();
        const robotTypeSchemaInstance = require("../src/persistence/schemas/robotTypeSchema").default;
        Container.set("robotTypeSchema", robotTypeSchemaInstance);
  
        const robotTypeRepoClass = require("../src/repos/robotTypeRepo").default;
        const robotTypeRepoInstance = new robotTypeRepoClass();
        Container.set("robotTypeRepo", robotTypeRepoInstance);
  
        const robotServiceClass = require("../src/services/robotService").default;
        const robotServiceInstance = new robotServiceClass();
        Container.set("robotService", robotServiceInstance);
      });
      afterEach(function() {
        sandbox.restore();
      });
  
      it('createRobotType: returns JSON with designation+brand+model+task values', async function () {
        let body = {
            "id": 123,
            "designation": "robolindo",
            "brand": "Croissants",
            "modelRobot": "do Lidl",
            "task": 2
        };
        
        const req: Partial<Request> = {};
        req.body = body;
    
        const res: Partial<Response> = {
          json: sinon.spy(),
          status: sinon.stub().returnsThis(),
        };
        
        const next: Partial<NextFunction> = () => {};
    
        const robotServiceInstance = Container.get("robotService");
    
        const expectedResult: IRobotTypeDTO = {
          "id": req.body.id,
          "designation": req.body.designation,
          "brand": req.body.brand,
          "modelRobot": req.body.modelRobot,
          "task": req.body.task
        };
    
        sinon.stub(robotServiceInstance, "createRobotType").returns( Result.ok<IRobotTypeDTO>( {
          "id": req.body.id,
          "designation": req.body.designation,
          "brand": req.body.brand,
          "modelRobot": req.body.modelRobot,
          "task": req.body.task
        }));
    
        const ctrl = new robotController(robotServiceInstance as IRobotService);
    
        await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);
    
        // Assertions
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(expectedResult));
      });

      it('addRobot: returns JSON with robot values', async function () {
        let robotTypeValues = {
            "id": 123,
            "designation": "robolindo",
            "brand": "Croissants",
            "modelRobot": "do Lidl",
            "task": 2
        };

        let robotValues = {
          "id": 1,
          "nickname": "Robot_do_lidl",
          "type": robotTypeValues,
          "serialNumber": "1213434",
          "description": "Ira fazer as entregas todas do lidl"
      };
        
        const req: Partial<Request> = {};
        req.body = robotValues;
    
        const res: Partial<Response> = {
          json: sinon.spy(),
          status: sinon.stub().returnsThis(),
        };
        
        const next: Partial<NextFunction> = () => {};
    
        const robotServiceInstance = Container.get("robotService");
    
        const expectedResult: IRobotDTO = {
          "id": req.body.id,
          "isActive": req.body.isActive,
          "nickname": req.body.nickname,
          "type": req.body.type,
          "serialNumber": req.body.serialNumber,
          "description": req.body.description
        };
    
        sinon.stub(robotServiceInstance, "addRobot").returns( Result.ok<IRobotDTO>( {
          "id": req.body.id,
          "isActive": req.body.isActive,
          "nickname": req.body.nickname,
          "type": req.body.type,
          "serialNumber": req.body.serialNumber,
          "description": req.body.description
        }));
    
        const ctrl = new robotController(robotServiceInstance as IRobotService);
    
        await ctrl.addRobot(<Request>req, <Response>res, <NextFunction>next);
    
        // Assertions
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(expectedResult));
      });    
  });