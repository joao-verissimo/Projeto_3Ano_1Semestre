import { IFloorPersistence } from "../../dataschema/IFloorPersistence";
import mongoose, { Schema } from "mongoose";

const FloorSchema = new mongoose.Schema({
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building',
      },
    
    name: {
        type: String,
        required: [true, 'Please enter a floor name'],
        index: true,
      },
  
    description: {
        type: String,
        required: [true, 'Please enter the floor description'],
        index: true,
      },
  
    room: {
        type: Number,
        required: [true, 'Please enter the number of floors'],
        min: [1, 'At least one room is required'],
      },
  
    hall : {
        type: String,
        required: [true, 'Please enter the floor hall'],
        index: true,
      },
    floorMap: {
        type: String,
        required: [true, 'Please enter the floor map'],
        index: true,
      },
      hasElevator: {
        type: Boolean,
        required: [true, 'Please specify whether the floor has an elevator'],
        index: true,
      },
      passages: [{
          type: Schema.Types.ObjectId,
          ref: 'Floor',
        }],
    },
    { timestamps: true }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor',FloorSchema);