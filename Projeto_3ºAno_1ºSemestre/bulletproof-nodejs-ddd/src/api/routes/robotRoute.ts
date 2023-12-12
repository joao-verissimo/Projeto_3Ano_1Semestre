import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import IRobotController from '../../controllers/IControllers/IRobotController';
import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/robot', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController

  route.post(
    '/addRobot',
    celebrate({
        body: Joi.object({
          nickname: Joi.string().required(),
          type: Joi.string().required(),
          serialNumber: Joi.string().required(),
          description: Joi.string().required(),
          isActive: Joi.boolean()
        }),
      }), (req,res,next) => ctrl.addRobot(req,res,next));

  route.post(
    '/createRobot',
        celebrate({
          body: Joi.object({
            designation: Joi.string().required(),
            brand: Joi.string().required(),
            modelRobot: Joi.string().required(),
            task: Joi.number().required()
          }),
        }),(req,res,next) => ctrl.createRobotType(req,res,next));
  // /changeRobotState
  route.patch(
    '/changeRobotState',
        celebrate({
          body: Joi.object({
            id: Joi.string().required(),
          }),
        }),(req,res,next) => ctrl.changeRobotState(req,res,next));
  
  route.get(
    '/list',
    celebrate({body: Joi.object({
      value: Joi.object().optional(),
    }),
  }),(req, res, next) => ctrl.listAllRobotTypes(req, res, next));
};