import mongoose, { Schema, Document } from 'mongoose';
import { Program as ProgramInterface, ProgramType } from '@/types';

// Define the Program document interface extending Mongoose Document and our ProgramInterface
export interface ProgramDocument extends ProgramInterface, Document {
  id: string; // Overwrite id from ProgramInterface as Mongoose uses _id
}

// Define the Program schema
const ProgramSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Program name is required.'],
      trim: true,
    },
    type: {
      type: String,
      // Although ProgramType allows any string, we can still list common ones for potential validation or UI hints
      enum: ['TB', 'Malaria', 'HIV', 'Diabetes', 'Maternal', 'Other', String], 
      required: [true, 'Program type is required.'],
    },
    description: {
      type: String,
      required: [true, 'Program description is required.'],
    },
    goals: {
      type: String,
      required: [true, 'Program goals are required.'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required.'],
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'planned'],
      required: [true, 'Program status is required.'],
      default: 'planned',
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Ensure virtuals are included when converting to JSON
    toObject: { virtuals: true } // Ensure virtuals are included when converting to Object
  }
);

// Virtual for 'id' to map Mongoose '_id' to 'id'
ProgramSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are included
ProgramSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: mongoose.Document, ret: { _id?: any; [key: string]: any }) { delete ret._id; } // Remove _id when converting to JSON
});

// Create and export the Program model
// Check if the model already exists to prevent OverwriteModelError in Next.js hot reloading
const Program = mongoose.models.Program || mongoose.model<ProgramDocument>('Program', ProgramSchema);

export default Program;