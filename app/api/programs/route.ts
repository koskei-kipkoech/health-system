import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Program from '@/models/Program';
import { Program as ProgramInterface } from '@/types';

export async function POST(request: NextRequest) {
  await connectDB(); // Properly handle MongoDB connection

  try {
    const body: ProgramInterface = await request.json();

    // Basic validation (more robust validation can be added)
    if (!body.name || !body.type || !body.description || !body.goals || !body.startDate || !body.status) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // If type is 'Other', the name field itself might represent the custom type
    // Or you might want a separate field for custom type name if 'Other' is selected.
    // For now, we'll allow any string as per the updated ProgramType.

    const newProgram = new Program({
      ...body,
      // Mongoose handles createdAt/updatedAt automatically due to timestamps: true
    });

    await newProgram.save();

    // Return the created program (excluding the Mongoose _id and __v)
    const createdProgram = newProgram.toObject();
    delete createdProgram._id;
    delete createdProgram.__v;

    return NextResponse.json({ success: true, data: createdProgram }, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    // Handle potential Mongoose validation errors and other errors
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      }
      // Handle other specific error types if needed
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    // Handle non-Error exceptions
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
  }
}

// Optional: GET route to fetch all programs (implement later if needed)
// export async function GET() {
//   await dbConnect();
//   try {
//     const programs = await Program.find({});
//     // Map programs to remove _id and __v if desired
//     const formattedPrograms = programs.map(p => {
//       const obj = p.toObject();
//       delete obj._id;
//       delete obj.__v;
//       return obj;
//     });
//     return NextResponse.json({ success: true, data: formattedPrograms });
//   } catch (error) {
//     console.error('Error fetching programs:', error);
//     return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
//   }
// }