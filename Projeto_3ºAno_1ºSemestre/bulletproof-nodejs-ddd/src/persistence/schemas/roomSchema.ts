import { IRoomPersistence } from '../../dataschema/IRoomPersistence';
import mongoose, { Schema } from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    floor: {
      type: Schema.Types.ObjectId,
      ref: 'Floor',
      required: true,
    },

    name: {
      type: String,
      required: [true, 'Please enter a valid name'],
    },

    description: {
        type: String,
        required: [true, 'Please enter a valid description'],
    },

    dimension: {
        type: [Number],
        required: [true, 'Please enter valid position and size'],
    }
    },
  { timestamps: true }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('room', roomSchema);