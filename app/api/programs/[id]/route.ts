import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import Program from '@/models/Program';

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Program ID is required' },
        { status: 400 }
      );
    }

    const deletedProgram = await Program.findByIdAndDelete(new mongoose.Types.ObjectId(id));

    if (!deletedProgram) {
      return NextResponse.json(
        { success: false, error: 'Program not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedProgram });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete program' },
      { status: 500 }
    );
  }
}