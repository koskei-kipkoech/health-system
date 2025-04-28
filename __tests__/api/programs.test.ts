import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { GET, POST } from '@/app/api/programs/route';
import { DELETE, PUT } from '@/app/api/programs/[id]/route';
import { connectDB } from '@/lib/db';
import Program from '@/models/Program';
import { Program as ProgramInterface } from '@/types';

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

jest.mock('@/models/Program', () => {
  // Mock the constructor and instance methods
  const mockProgramInstance = {
    save: jest.fn().mockResolvedValue(undefined) as MockedFunction<() => Promise<void>>,
    toObject: jest.fn().mockReturnValue({}) as MockedFunction<() => Record<string, any>>
  };
  const MockProgram = jest.fn().mockImplementation(() => mockProgramInstance);

  // Assign static methods directly to the mock constructor function
  MockProgram.find = jest.fn() as MockedFunction<typeof Program.find>;
  MockProgram.findByIdAndUpdate = jest.fn() as MockedFunction<typeof Program.findByIdAndUpdate>;
  MockProgram.findByIdAndDelete = jest.fn() as MockedFunction<typeof Program.findByIdAndDelete>;
  // Add any other static methods if needed

  // Return the mock constructor as the default export
  return {
    __esModule: true, // Indicate this is an ES module
    default: MockProgram
  };
});

jest.mock('mongoose', () => ({
  Types: {
    ObjectId: jest.fn().mockImplementation((id) => id),
  },
  // Add this to handle the 'new mongoose.Types.ObjectId(id)' pattern
  __esModule: true,
  default: {
    Types: {
      ObjectId: jest.fn().mockImplementation((id) => id)
    }
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

describe('Programs API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/programs', () => {
    it('should return all programs successfully', async () => {
      // Arrange
      const mockPrograms = [
        { 
          _id: '1', 
          name: 'TB Program', 
          description: 'Tuberculosis treatment program',
          type: 'TB',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          _id: '2', 
          name: 'HIV Program', 
          description: 'HIV prevention program',
          type: 'HIV',
          status: 'planned',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ];
      
      // Mock the find method
      (Program.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockPrograms),
      });

      // Act
      const response = await GET();

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(Program.find).toHaveBeenCalledWith({});
      expect(NextResponse.json).toHaveBeenCalledWith({
        success: true,
        data: expect.any(Array),
      });
    });

    it('should handle errors when fetching programs fails', async () => {
      // Arrange
      const mockError = new Error('Database error');
      // Mock the find method
      (Program.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockRejectedValue(mockError),
      });

      // Act
      const response = await GET();

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: 'Failed to fetch programs' }),
        { status: 500 }
      );
    });
  });

  describe.only('POST /api/programs', () => {
    it('should create a new program successfully', async () => {
      // Arrange
      const mockProgramData = {
        name: 'Malaria Program',
        type: 'Malaria',
        description: 'Malaria prevention and treatment',
        goals: 'Reduce malaria cases by 50%',
        startDate: new Date(),
        status: 'active',
      };
      
      const mockCreatedProgram = { ...mockProgramData, _id: '123', __v: 0 };
      
      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockProgramData),
      } as unknown as NextRequest;
      
      // Set up mock implementations for this test
      const mockProgramInstance = {
        save: jest.fn().mockResolvedValueOnce(undefined),
        toObject: jest.fn().mockReturnValueOnce(mockCreatedProgram)
      };
      (Program as unknown as jest.Mock).mockImplementationOnce(() => mockProgramInstance);

      // Act
      const response = await POST(mockRequest);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(mockRequest.json).toHaveBeenCalled();
      expect(mockProgramInstance.save).toHaveBeenCalled();
      expect(mockProgramInstance.toObject).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
        { success: true, data: expect.objectContaining({
          name: mockProgramData.name,
          type: mockProgramData.type,
        })},
        { status: 201 }
      );
    });

    it('should return 400 when required fields are missing', async () => {
      // Arrange
      const mockIncompleteData = {
        name: 'Incomplete Program',
        // Missing required fields
      };
      
      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockIncompleteData),
      } as unknown as NextRequest;

      // Act
      const response = await POST(mockRequest);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(mockRequest.json).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    });

    it('should handle validation errors', async () => {
      // Arrange
      const mockProgramData = {
        name: 'Malaria Program',
        type: 'Malaria',
        description: 'Malaria prevention and treatment',
        goals: 'Reduce malaria cases by 50%',
        startDate: new Date(),
        status: 'active',
      };
      
      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockProgramData),
      } as unknown as NextRequest;
      
      const validationError = new Error('Validation failed') as any;
      validationError.name = 'ValidationError';
      
      // Set up mock to throw validation error
      const mockProgramInstance = {
        save: jest.fn().mockRejectedValueOnce(validationError),
        toObject: jest.fn()
      };
      (Program as unknown as jest.Mock).mockImplementationOnce(() => mockProgramInstance);

      // Act
      const response = await POST(mockRequest);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(mockRequest.json).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
        { success: false, error: 'Validation failed' },
        { status: 400 }
      );
    });
  });

  describe('PUT /api/programs/[id]', () => {
    it('should update a program successfully', async () => {
      // Arrange
      const programId = '123';
      const mockUpdateData = {
        name: 'Updated Program',
        status: 'completed',
      };
      
      const mockUpdatedProgram = { 
        _id: programId,
        ...mockUpdateData,
        type: 'TB',
        description: 'Updated description',
        goals: 'Updated goals',
        startDate: new Date(),
      };
      
      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockUpdateData),
      } as unknown as NextRequest;
      
      const mockContext = {
        params: { id: programId },
      };
      
      // Mock the findByIdAndUpdate method with the correct ID handling
      (Program.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockUpdatedProgram);

      // Act
      const response = await PUT(mockRequest, mockContext);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(mockRequest.json).toHaveBeenCalled();
      expect(Program.findByIdAndUpdate).toHaveBeenCalledWith(
        programId,
        mockUpdateData,
        { new: true }
      );
      expect(NextResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockUpdatedProgram,
      });
    });

    it('should return 404 when program is not found', async () => {
      // Arrange
      const programId = 'nonexistent';
      const mockUpdateData = {
        name: 'Updated Program',
      };
      
      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockUpdateData),
      } as unknown as NextRequest;
      
      const mockContext = {
        params: { id: programId },
      };
      
      // Mock the findByIdAndUpdate method for the not found case
      (Program.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

      // Act
      const response = await PUT(mockRequest, mockContext);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(Program.findByIdAndUpdate).toHaveBeenCalledWith(
        programId,
        mockUpdateData,
        { new: true }
      );
      expect(NextResponse.json).toHaveBeenCalledWith(
        { success: false, error: 'Program not found' },
        { status: 404 }
      );
    });

    it('should handle errors during update', async () => {
      // Arrange
      const programId = '123';
      const mockUpdateData = {
        name: 'Updated Program',
      };
      
      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockUpdateData),
      } as unknown as NextRequest;
      
      const mockContext = {
        params: { id: programId },
      };
      
      const mockError = new Error('Database error');
      // Mock the findByIdAndUpdate method to throw an error
      (Program.findByIdAndUpdate as jest.Mock).mockRejectedValueOnce(mockError);

      // Act
      const response = await PUT(mockRequest, mockContext);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(Program.findByIdAndUpdate).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
        { success: false, error: 'Failed to update program' },
        { status: 500 }
      );
    });
  });

  describe('DELETE /api/programs/[id]', () => {
    it('should delete a program successfully', async () => {
      // Arrange
      const programId = '123';
      const mockDeletedProgram = { 
        _id: programId,
        name: 'Deleted Program',
        type: 'TB',
        description: 'Program to be deleted',
        goals: 'Goals',
        startDate: new Date(),
        status: 'active',
      };
      
      const mockRequest = {} as NextRequest;
      const mockContext = {
        params: { id: programId },
      };
      
      // Mock the findByIdAndDelete method with the correct ID handling
      (Program.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockDeletedProgram);

      // Act
      const response = await DELETE(mockRequest, mockContext);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(Program.findByIdAndDelete).toHaveBeenCalledWith(programId);
      expect(NextResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockDeletedProgram,
      });
    });

    it('should return 404 when program is not found', async () => {
      // Arrange
      const programId = 'nonexistent';
      
      const mockRequest = {} as NextRequest;
      const mockContext = {
        params: { id: programId },
      };
      
      // Mock the findByIdAndDelete method for the not found case
      (Program.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

      // Act
      const response = await DELETE(mockRequest, mockContext);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(Program.findByIdAndDelete).toHaveBeenCalledWith(programId);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { success: false, error: 'Program not found' },
        { status: 404 }
      );
    });

    it('should handle errors during deletion', async () => {
      // Arrange
      const programId = '123';
      
      const mockRequest = {} as NextRequest;
      const mockContext = {
        params: { id: programId },
      };
      
      const mockError = new Error('Database error');
      // Mock the findByIdAndDelete method to throw an error
      (Program.findByIdAndDelete as jest.Mock).mockRejectedValueOnce(mockError);

      // Act
      const response = await DELETE(mockRequest, mockContext);

      // Assert
      expect(connectDB).toHaveBeenCalled();
      expect(Program.findByIdAndDelete).toHaveBeenCalled();
      expect(NextResponse.json).toHaveBeenCalledWith(
        { success: false, error: 'Failed to delete program' },
        { status: 500 }
      );
    });
  });
});