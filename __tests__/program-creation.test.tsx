import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgramCreationForm } from '@/components/ui/program-creation-form';

// Mock the fetch function
global.fetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('ProgramCreationForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, data: { id: '123' } })
      });
    });
  });

  it('should render the program creation form', () => {
    render(<ProgramCreationForm onSuccess={jest.fn()} onCancel={jest.fn()} />);
    
    expect(screen.getByText('Create Health Program')).toBeInTheDocument();
    expect(screen.getByLabelText('Program Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Program Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Goals')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(<ProgramCreationForm onSuccess={jest.fn()} onCancel={jest.fn()} />);
    
    // Submit the form without filling any fields
    const submitButton = screen.getByText('Create Program');
    fireEvent.click(submitButton);
    
    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByText('Program name is required')).toBeInTheDocument();
      expect(screen.getByText('Program type is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
      expect(screen.getByText('Goals are required')).toBeInTheDocument();
      expect(screen.getByText('Start date is required')).toBeInTheDocument();
    });
  });

  it('should submit the form with valid data', async () => {
    const mockOnSuccess = jest.fn();
    render(<ProgramCreationForm onSuccess={mockOnSuccess} onCancel={jest.fn()} />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Program Name'), { target: { value: 'TB Program' } });
    fireEvent.change(screen.getByLabelText('Program Type'), { target: { value: 'TB' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Tuberculosis treatment program' } });
    fireEvent.change(screen.getByLabelText('Goals'), { target: { value: 'Reduce TB cases by 50%' } });
    fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'active' } });
    
    // Submit the form
    const submitButton = screen.getByText('Create Program');
    fireEvent.click(submitButton);
    
    // Verify the API was called with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/programs',
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Object),
          body: expect.stringContaining('"name":"TB Program"')
        })
      );
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('should handle API errors gracefully', async () => {
    // Mock a failed API response
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to create program' })
      });
    });

    render(<ProgramCreationForm onSuccess={jest.fn()} onCancel={jest.fn()} />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Program Name'), { target: { value: 'TB Program' } });
    fireEvent.change(screen.getByLabelText('Program Type'), { target: { value: 'TB' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Tuberculosis treatment program' } });
    fireEvent.change(screen.getByLabelText('Goals'), { target: { value: 'Reduce TB cases by 50%' } });
    fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'active' } });
    
    // Submit the form
    const submitButton = screen.getByText('Create Program');
    fireEvent.click(submitButton);
    
    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to create program')).toBeInTheDocument();
    });
  });

  it('should call onCancel when cancel button is clicked', () => {
    const mockOnCancel = jest.fn();
    render(<ProgramCreationForm onSuccess={jest.fn()} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });
});