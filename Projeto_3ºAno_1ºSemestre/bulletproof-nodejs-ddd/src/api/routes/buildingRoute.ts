import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import IBuildingsController from '../../controllers/IControllers/IBuildingsController';
import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/building', route);

  const ctrl = Container.get(config.controllers.buildings.name) as IBuildingsController;
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        localizationoncampus: Joi.string().required(),
        floors: Joi.number().required(),
        lifts: Joi.number().required(),
        maxCel: Joi.array().items(Joi.number().required()).required(),
      }),
    }),(req, res, next) => ctrl.createBuilding(req, res, next));
  
  route.get(
    '/MinMaxFloors',
    celebrate({
      query: Joi.object({
        minFloors: Joi.number().required(),
        maxFloors: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.listBuildingsByFloors(req, res, next));

  route.put(
    '/update',
    celebrate({
        body: Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required(),
          localizationoncampus: Joi.string().required(),
          floors: Joi.number().required(),
          lifts: Joi.number().required(),
          maxCel: Joi.array().items(Joi.number().required()).required(),
      }),
    }),(req,res,next)=> ctrl.updateBuilding(req,res,next));
  
    route.get(
      '/list',
      celebrate({body: Joi.object({
        value: Joi.object().required(),
      }),}),(req, res, next) => ctrl.findAll(req, res, next));    
}