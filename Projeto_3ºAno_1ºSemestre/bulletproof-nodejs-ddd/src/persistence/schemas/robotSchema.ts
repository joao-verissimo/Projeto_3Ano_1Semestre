import mongoose, { Schema } from 'mongoose';
import IRobotPersistance from '../../dataschema/IRobotPersistance';

const RobotSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Please enter the nickname of the robot'],
      index: true,
    },

    type: {
        type: Schema.Types.ObjectId,
        ref: 'robotType',
    },

    serialNumber: {
      type: String,
      required: [true, 'Please enter the serial number of the robot'],
      index: true,
    },

    description: {
        type: String,
        required: [true, 'Please enter the description of the robot'],
        index: true,
      },

      isActive: {
          type: Boolean,
          required: [true, 'Please enter the state of the robot'],
          index: true,
        },
  },
  { timestamps: true }
);

export default mongoose.model<IRobotPersistance & mongoose.Document>('Robot', RobotSchema);