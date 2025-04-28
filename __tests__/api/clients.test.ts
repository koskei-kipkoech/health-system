import { NextRequest, NextResponse } from 'next/server';
import { GET, POST } from '@/app/api/clients/route';
import { connectDB } from '@/lib/db';
import { Client } from '@/models/Client';

// Add TypeScript interface for mocked functions
interface MockedFunction<T extends (...args: any) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  mockClear: () => void;
  mockReset: () => void;
  mockImplementation: (implementation: (...args: Parameters<T>) => ReturnType<T>) => MockedFunction<T>;
  mockImplementationOnce: (implementation: (...args: Parameters<T>) => ReturnType<T>) => MockedFunction<T>;
  mockReturnValue: (value: ReturnType<T>) => MockedFunction<T>;
  mockReturnValueOnce: (value: ReturnType<T>) => MockedFunction<T>;
  mockResolvedValue: (value: Awaited<ReturnType<T>>) => MockedFunction<T>;
  mockResolvedValueOnce: (value: Awaited<ReturnType<T>>) => MockedFunction<T>;
  mockRejectedValue: (value: unknown) => MockedFunction<T>;
  mockRejectedValueOnce: (value: unknown) => MockedFunction<T>;
}

// Mock the dependencies
jest.mock('@/lib/db', () => ({
  connectDB: jest.fn(),
}));

jest.mock('@/models/Client', () => ({
  Client: {
    find: jest.fn(),
    create: jest.fn(),
  }
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => ({
      data,
      options,
    })),
  },
}));

describe('Clients API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/clients', () => {
    it('should return all clients successfully', async () => {
      // Arrange
      const mockClients = [
        { _id: '1', name: 'John Doe', email: 'john@example.com' },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ];
      (Client.find as jest.Mock).mockResolvedValue(mockClients);

      // Act
      const response = await GET();

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(Client.find).toHaveBeenCalledWith({});
      expect(NextResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockClients,
      });
    });

    it('should handle errors when fetching clients fails', async () => {
      // Arrange
      const mockError = new Error('Database error');
      (Client.find as jest.Mock).mockRejectedValue(mockError);

      // Act
      const response = await GET();

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
        { success: false, error: 'Failed to fetch clients' },
        { status: 500 }
      );
    });
  });

  describe('POST /api/clients', () => {
    it('should create a new client successfully', async () => {
      // Arrange
      const mockClientData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        dateOfBirth: '1990-01-01',
      };
      const mockCreatedClient = { ...mockClientData, _id: '123' };
      
      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockClientData),
      } as unknown as NextRequest;
      
      (Client.create as jest.Mock).mockResolvedValue(mockCreatedClient);

      // Act
      const response = await POST(mockRequest);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(mockRequest.json).toHaveBeenCalled();
      expect(Client.create).toHaveBeenCalledWith(mockClientData);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Client registered successfully', client: mockCreatedClient },
        { status: 201 }
      );
    });

    it('should return 400 when required fields are missing', async () => {
      // Arrange
      const mockIncompleteData = {
        name: 'John Doe',
        // Missing email and phone
      };
      
      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockIncompleteData),
      } as unknown as NextRequest;

      // Act
      const response = await POST(mockRequest);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(mockRequest.json).toHaveBeenCalled();
      expect(Client.create).not.toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
        { message: 'Missing required fields', errors: ['name', 'email', 'phone'] },
        { status: 400 }
      );
    });
  });
});