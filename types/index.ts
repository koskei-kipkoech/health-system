export interface IProgram {
  _id?: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClient {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: string[];
    notes: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  enrolledPrograms: string[];
  registrationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ProgramType = 'TB' | 'Malaria' | 'HIV' | 'Diabetes' | 'Maternal' | 'Other' | string; // Allow string for custom types

export interface Program {
  id: string;
  name: string;
  type: ProgramType;
  description: string;
  goals: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'completed' | 'planned';
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