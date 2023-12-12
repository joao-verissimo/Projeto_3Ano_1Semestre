import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000, 

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:105711abb1e672194c53cbe4@vsgate-s1.dei.isep.ipp.pt:11147/?authMechanism=DEFAULT",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    buildings: {
      name: "BuildingsController",
      path: "../controllers/buildingsController"
    },
    robot: {
      name: "RobotController",
      path: "../controllers/robotController"
    },

    lift: {
      name: "LiftController",
      path: "../controllers/liftController"
    },
    floor:{
      name: "floorController",
      path: "../controllers/floorController"
    },
    room:{
      name: "roomController",
      path: "../controllers/roomController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    buildings: {
      name: "BuildingsRepo",
      path: "../repos/buildingsRepo"
    },
    robotType: {
      name: "robotTypeRepo",
      path: "../repos/robotTypeRepo"
    },
    robot: {
      name: "RobotRepo",
      path: "../repos/robotRepo"
    },
    lift: {
      name: "LiftRepo",
      path: "../repos/liftRepo"
    },
    floor: {
      name: "floorRepo",
      path: "../repos/floorRepo" 
    },
    room: {
      name: "roomRepo",
      path: "../repos/roomRepo" 
    }
  
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    buildings: {
      name: "buildingsService",
      path: "../services/buildingsService"
    },
    robot: {
      name: "robotService",
      path: "../services/robotService"
    },
    lift: {
      name: "LiftService",
      path: "../services/liftService"
    },
    floor: {
      name: "FloorService",
      path: "../services/floorService"
    },
    room: {
      name: "RoomService",
      path: "../services/roomService"
    }
  },
};
