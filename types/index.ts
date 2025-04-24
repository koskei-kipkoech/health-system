export interface IProgram {
  _id?: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClient {
  _id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  contactNumber: string;
  email: string;
  address: string;
  enrolledPrograms: string[]; // Array of program IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface IEnrollment {
  _id?: string;
  clientId: string;
  programId: string;
  enrollmentDate: Date;
  status: 'active' | 'completed' | 'withdrawn';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}