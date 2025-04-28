import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClientEnrollment } from '@/components/ui/client-enrollment';

// Mock the fetch function
global.fetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

// Mock the necessary props
const mockClient = {
  _id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  enrolledPrograms: ['456'],
  dateOfBirth: '1990-01-01',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345'
  },
  medicalHistory: {
    conditions: [],
    allergies: [],
    medications: []
  },
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '0987654321'
  },
  registrationDate: new Date().toISOString()
};

const mockPrograms = [
  { _id: '456', name: 'TB Program', type: 'TB' },
  { _id: '789', name: 'HIV Program', type: 'HIV' },
  { _id: '101', name: 'Malaria Program', type: 'Malaria' }
];

describe('ClientEnrollment Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === '/api/programs') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockPrograms })
        });
      }
      if (url === `/api/clients/${mockClient._id}/enroll`) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  it('should render the enrollment form with available programs', async () => {
    render(<ClientEnrollment client={mockClient} onSuccess={jest.fn()} onCancel={jest.fn()} />);

    await waitFor(() => {
      // Check the correct heading with the client's name
      expect(screen.getByText(`Enroll ${mockClient.name} in Programs`)).toBeInTheDocument();
      // Check labels for programs (full text including type)
      expect(screen.getByLabelText('TB Program (TB)')).toBeInTheDocument();
      expect(screen.getByLabelText('HIV Program (HIV)')).toBeInTheDocument();
      expect(screen.getByLabelText('Malaria Program (Malaria)')).toBeInTheDocument();
    });
  });

  it('should show already enrolled programs as selected', async () => {
    render(<ClientEnrollment client={mockClient} onSuccess={jest.fn()} onCancel={jest.fn()} />);

    await waitFor(() => {
      // TB Program should be checked since it's in enrolledPrograms
      const tbCheckbox = screen.getByLabelText('TB Program (TB)');
      expect(tbCheckbox).toBeChecked();

      // Verify others are not checked
      const hivCheckbox = screen.getByLabelText('HIV Program (HIV)');
      expect(hivCheckbox).not.toBeChecked();
    });
  });

  it('should allow enrolling in additional programs', async () => {
    const mockOnSuccess = jest.fn();
    render(<ClientEnrollment client={mockClient} onSuccess={mockOnSuccess} onCancel={jest.fn()} />);

    await waitFor(() => {
      // Check the HIV Program checkbox
      const hivCheckbox = screen.getByLabelText('HIV Program (HIV)');
      fireEvent.click(hivCheckbox);
      expect(hivCheckbox).toBeChecked();

      // Submit the form with the correct button text
      const submitButton = screen.getByText('Enroll in Selected Programs');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      // Verify the fetch call with the correct endpoint and data
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/clients/${mockClient._id}/enroll`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ programIds: ['456', '789'] }) // TB and HIV selected
        })
      );
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('should handle API errors gracefully', async () => {
    // Override fetch to simulate an error on enroll
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockPrograms })
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: 'Failed to enroll client' })
        })
      );

    render(<ClientEnrollment client={mockClient} onSuccess={jest.fn()} onCancel={jest.fn()} />);

    await waitFor(() => {
      const hivCheckbox = screen.getByLabelText('HIV Program (HIV)');
      fireEvent.click(hivCheckbox);

      const submitButton = screen.getByText('Enroll in Selected Programs');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      // Check that the error message appears
      expect(screen.getByText('Failed to enroll client')).toBeInTheDocument();
    });
  });
});