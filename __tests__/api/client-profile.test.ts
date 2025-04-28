import { NextRequest, NextResponse } from 'next/server';
import { GET } from '@/app/api/clients/[clientId]/route';
import { connectDB } from '@/lib/db';
import { Client } from '@/models/Client';

// Mock the dependencies
jest.mock('@/lib/db', () => ({
  connectDB: jest.fn(),
}));

jest.mock('@/models/Client', () => ({
  Client: {
    findById: jest.fn(),
  },
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => ({
      data,
      options,
    })),
  },
}));

describe('Client Profile API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure connectDB resolves successfully by default
    (connectDB as jest.Mock).mockResolvedValue(undefined);
  });

  describe('GET /api/clients/[clientId]', () => {
    it('should return a client profile successfully', async () => {
      // Arrange
      const mockClient = {
        _id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        dateOfBirth: '1990-01-01',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
        },
        medicalHistory: {
          conditions: ['Asthma'],
          allergies: ['Penicillin'],
          medications: ['Albuterol'],
          notes: 'Regular checkups required',
        },
        emergencyContact: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phone: '0987654321',
        },
        enrolledPrograms: [],
        registrationDate: '2023-01-15T00:00:00.000Z',
      };
      
      (Client.findById as jest.Mock).mockResolvedValue(mockClient);
      
      const mockParams = { params: { clientId: '123' } };

      // Act
      await GET({} as NextRequest, mockParams);

      // Assert
      expect(connectDB).toHaveBeenCalledTimes(1);
      expect(Client.findById).toHaveBeenCalledWith('123');
      expect(NextResponse.json).toHaveBeenCalledWith(mockClient);
    });

    it('should return 404 when client is not found', async () => {
      // Arrange
      (Client.findById as jest.Mock).mockResolvedValue(null);
      
      const mockParams = { params: { clientId: '999' } };

      // Act
      await GET({} as NextRequest, mockParams);

      // Assert
      expect(connectDB).toHaveBeenCalledTimes(1);
      expect(Client.findById).toHaveBeenCalledWith('999');
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Client not found' },
        { status: 404 }
      );
    });

    it('should handle errors when fetching client fails', async () => {
      // Arrange
      const mockError = new Error('Database error');
      (Client.findById as jest.Mock).mockRejectedValue(mockError);
      
      const mockParams = { params: { clientId: '123' } };

      // Act
      await GET({} as NextRequest, mockParams);

      // Assert
      expect(connectDB).toHaveBeenCalledTimes(1);
      expect(Client.findById).toHaveBeenCalledWith('123');
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Failed to fetch client profile' },
        { status: 500 }
      );
    });

    it('should return 400 when clientId is not provided', async () => {
      // Arrange
      const mockParams = { params: {} };

      // Act
      await GET({} as NextRequest, mockParams);

      // Assert
      expect(connectDB).toHaveBeenCalledTimes(1);
      expect(Client.findById).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    });
  });
});