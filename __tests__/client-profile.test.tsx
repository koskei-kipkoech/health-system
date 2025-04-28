import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClientProfile } from '@/components/ui/client-profile';

describe('ClientProfile Component', () => {
  const mockClient = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    dateOfBirth: '1990-01-01',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345'
    },
    medicalHistory: {
      conditions: ['Asthma', 'Hypertension'],
      allergies: ['Penicillin'],
      medications: ['Albuterol', 'Lisinopril'],
      notes: 'Patient is responding well to treatment.'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '0987654321'
    },
    enrolledPrograms: ['TB Program', 'HIV Program'],
    registrationDate: '2023-01-15T00:00:00.000Z'
  };

  it('should render client personal information correctly', () => {
    render(<ClientProfile client={mockClient} onClose={() => {}} />);
    
    // Check if client name is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check if contact information is displayed
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 1234567890')).toBeInTheDocument();
    expect(screen.getByText('Date of Birth: 1990-01-01')).toBeInTheDocument();
  });

  it('should render client address correctly', () => {
    render(<ClientProfile client={mockClient} onClose={() => {}} />);
    
    // Check if address information is displayed
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Anytown, CA 12345')).toBeInTheDocument();
  });

  it('should render emergency contact information correctly', () => {
    render(<ClientProfile client={mockClient} onClose={() => {}} />);
    
    // Check if emergency contact information is displayed
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Spouse')).toBeInTheDocument();
    expect(screen.getByText('0987654321')).toBeInTheDocument();
  });

  it('should render enrolled programs correctly', () => {
    render(<ClientProfile client={mockClient} onClose={() => {}} />);
    
    // Check if enrolled programs are displayed
    expect(screen.getByText('TB Program')).toBeInTheDocument();
    expect(screen.getByText('HIV Program')).toBeInTheDocument();
  });

  it('should render medical history correctly', () => {
    render(<ClientProfile client={mockClient} onClose={() => {}} />);
    
    // Check if medical conditions are displayed
    expect(screen.getByText('Asthma')).toBeInTheDocument();
    expect(screen.getByText('Hypertension')).toBeInTheDocument();
    
    // Check if allergies are displayed
    expect(screen.getByText('Penicillin')).toBeInTheDocument();
    
    // Check if medications are displayed
    expect(screen.getByText('Albuterol')).toBeInTheDocument();
    expect(screen.getByText('Lisinopril')).toBeInTheDocument();
    
    // Check if notes are displayed
    expect(screen.getByText('Patient is responding well to treatment.')).toBeInTheDocument();
  });

  it('should display a message when client has no enrolled programs', () => {
    const clientWithNoPrograms = {
      ...mockClient,
      enrolledPrograms: []
    };
    
    render(<ClientProfile client={clientWithNoPrograms} onClose={() => {}} />);
    
    // Check if the "no programs" message is displayed
    expect(screen.getByText('No programs enrolled')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<ClientProfile client={mockClient} onClose={mockOnClose} />);
    
    // Find and click the close button
    const closeButton = screen.getByRole('button');
    closeButton.click();
    
    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  });
});