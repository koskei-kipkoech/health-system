import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Client } from '@/models/Client';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { message: 'Missing required fields', errors: ['name', 'email', 'phone'] },
        { status: 400 }
      );
    }

    const client = await Client.create(data);
    
    return NextResponse.json({ 
      message: 'Client registered successfully',
      client 
    }, { status: 201 });

  } catch (error: any) {
    let errorMessage = 'Failed to register client';
    let errorDetails = error;
    
    if (error.name === 'ValidationError') {
      errorMessage = 'Validation failed';
      errorDetails = Object.values(error.errors).map((err: any) => err.message);
    } else if (error.code === 11000) {
      errorMessage = 'Email already exists';
      errorDetails = { field: 'email' };
    }
    
    return NextResponse.json({ 
      message: errorMessage,
      errors: errorDetails
    }, { status: 400 });
  }
}