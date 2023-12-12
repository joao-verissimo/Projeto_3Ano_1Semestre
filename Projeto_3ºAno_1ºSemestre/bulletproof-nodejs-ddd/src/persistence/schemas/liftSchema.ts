import mongoose, { Schema, Document } from 'mongoose';
import { ILiftPersistence } from '../../dataschema/ILiftPersistence';

const Lift = new mongoose.Schema(
  {
  localization: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  building: {
    type: Schema.Types.ObjectId,
    ref: 'Building',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<ILiftPersistence & Document>('Lift', Lift);