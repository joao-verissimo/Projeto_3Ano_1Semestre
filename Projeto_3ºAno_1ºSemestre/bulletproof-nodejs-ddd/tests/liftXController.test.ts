import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ILiftService from "../src/services/IServices/ILiftService";
import LiftController from "../src/controllers/liftController";
import ILiftDTO from '../src/dto/ILiftDTO';
import { Lift } from '../src/domain/lift';

describe('Lift controller', function () {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    let liftSchemaInstance = require("../src/persistence/schemas/liftSchema").default;
    Container.set("liftSchema", liftSchemaInstance);

    let liftRepoClass = require("../src/repos/liftRepo").default;
    let liftRepoInstance = Container.get(liftRepoClass);
    Container.set("LiftRepo", liftRepoInstance);

    let liftServiceClass = require("../src/services/liftService").default;
    let liftServiceInstance = Container.get(liftServiceClass);
    Container.set("LiftService", liftServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('LiftController unit test using liftService stub', async function () {
    // Arrange
    let body = { "_id": 'lift123', "localization": 'Floor 1', "state": 'Active', "building": 'Building A' };
    let req: Partial<Request> = {};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction>  = () => {};

    let liftServiceInstance = Container.get("LiftService");
    sinon.stub(liftServiceInstance, "createLift").returns( Result.ok<ILiftDTO>( {"id": "123", "localization": req.body.localization, "state": req.body.state, "building": req.body.building} ));

    const ctrl = new LiftController(liftServiceInstance as ILiftService);

    // Act
    await ctrl.createLift(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "localization": req.body.localization, "state": req.body.state, "building": req.body.building}));
  });

  // Add more test cases as needed for other scenarios
});
