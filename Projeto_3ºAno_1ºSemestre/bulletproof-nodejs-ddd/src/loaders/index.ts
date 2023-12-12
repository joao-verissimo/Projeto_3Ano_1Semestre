import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  }

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  }

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  }

  const floorSchema = {
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };

  const roomService = {
    name: config.services.room.name,
    path: config.services.room.path
  }

  const roomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path
  }

  const roomController = {
    name: config.controllers.room.name,
    path: config.controllers.room.path
  }

  const roomSchema = {
    name: 'roomSchema',
    schema: '../persistence/schemas/roomSchema',
  };

  const buildingsService = {
    name: config.services.buildings.name,
    path: config.services.buildings.path
  }

  const buildingsRepo = {
    name: config.repos.buildings.name,
    path: config.repos.buildings.path
  }

  const buildingsController = {
    name: config.controllers.buildings.name,
    path: config.controllers.buildings.path
  }

  const buildingsSchema = {
    name: 'buildingsSchema',
    schema: '../persistence/schemas/buildingsSchema',
  };

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  }

  const robotTypeRepo = {
    name: config.repos.robotType.name,
    path: config.repos.robotType.path
  }

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  }

  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  }

  const robotSchema = {
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
  };

  const robotTypeSchema = {
    name: 'robotTypeSchema',
    schema: '../persistence/schemas/robotTypeSchema',
  };

  const liftService = {
    name: config.services.lift.name,
    path: config.services.lift.path
  }

  const liftRepo = {
    name: config.repos.lift.name,
    path: config.repos.lift.path
  }

  const liftController = {
    name: config.controllers.lift.name,
    path: config.controllers.lift.path
  }

  const liftSchema = {
    name: 'liftSchema',
    schema: '../persistence/schemas/liftSchema',
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      floorSchema,
      buildingsSchema,
      robotSchema,
      robotTypeSchema,
      liftSchema,
      roomSchema
    ],
    controllers: [
      roleController,
      floorController,
      buildingsController,
      robotController,
      liftController,
      roomController
    ],
    repos: [
      roleRepo,
      userRepo,
      floorRepo,
      buildingsRepo,
      roomRepo,
      robotTypeRepo,
      robotRepo,
      liftRepo
    ],
    services: [
      roleService,
      floorService,
      buildingsService,
      roomService,
      robotService,
      liftService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
