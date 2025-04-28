import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Client } from '@/models/Client';

export async function GET(request: NextRequest, { params }: { params: { clientId: string } }) {
  try {
    await connectDB();
    
    const { clientId } = params;
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    // Find the client by ID
    const client = await Client.findById(clientId);
    
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error('Error fetching client profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { clientId: string } }) {
  try {
    await connectDB();
    
    const { clientId } = params;
    const data = await request.json();
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    // Update the client
    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!updatedClient) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error('Error updating client profile:', error);
    return NextResponse.json(
      { error: 'Failed to update client profile' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { clientId: string } }) {
  try {
    await connectDB();
    
    const { clientId } = params;
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    // Delete the client
    const deletedClient = await Client.findByIdAndDelete(clientId);
    
    if (!deletedClient) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}