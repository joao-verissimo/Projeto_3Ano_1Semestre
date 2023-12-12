import mongoose from 'mongoose';
import { IRobotTypePersistance } from '../../dataschema/IRobotTypePersistance';

const RobotTypeSchema = new mongoose.Schema(
  {
    designation: {
      type: String,
      required: [true, 'Please enter the designation of the robot type'],
      index: true,
    },

    brand: {
      type: String,
      required: [true, 'Please enter the brand of the robot'],
      index: true,
    },

    modelRobot: {
      type: String,
      required: [true, 'Please enter the model of the robot'],
      index: true,
    },

    task: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRobotTypePersistance & mongoose.Document>('RobotType', RobotTypeSchema);