import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Client } from '@/models/Client';

export async function POST(request: NextRequest, { params }: { params: { clientId: string } }) {
  await connectDB();

  try {
    if (!params?.clientId) {
      return NextResponse.json(
        { success: false, error: 'Client ID is required' },
        { status: 400 }
      );
    }
    const { clientId } = params;
    const { programIds } = await request.json();

    // Validate input
    if (!programIds || !Array.isArray(programIds) || programIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid program IDs provided' },
        { status: 400 }
      );
    }

    // Find and update the client
    const client = await Client.findById(clientId);
    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    // Update enrolled programs
    // Initialize enrolledPrograms if empty and filter duplicates
    const currentPrograms = new Set(
      client.enrolledPrograms ? client.enrolledPrograms.map(String) : []
    );
    programIds.forEach(id => currentPrograms.add(id));
    client.enrolledPrograms = Array.from(currentPrograms);

    await client.save();

    return NextResponse.json({
      success: true,
      data: {
        clientId: client._id,
        enrolledPrograms: client.enrolledPrograms
      }
    });
  } catch (error) {
    console.error('Error enrolling client in programs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to enroll client in programs' },
      { status: 500 }
    );
  }
}