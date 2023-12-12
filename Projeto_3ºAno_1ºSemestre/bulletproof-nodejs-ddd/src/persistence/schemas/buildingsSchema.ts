import { IBuildingsPersistence } from '../../dataschema/IBuildingsPersistence';
import mongoose from 'mongoose';

const BuildingsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a building name'],
      index: true,
    },

    localizationoncampus: {
      type: String,
      required: [true, 'Please enter localization on campus'],
      index: true,
    },

    floors: {
      type: Number,
      required: [true, 'Please enter the number of floors'],
      min: [1, 'At least one floor is required'],
    },

    lifts: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxCel: {
      type: [Number],
      default: 0,
      min: [1, 'At least one cel is required'],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBuildingsPersistence & mongoose.Document>('Building', BuildingsSchema);