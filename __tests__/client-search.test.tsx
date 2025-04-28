import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClientSearch } from '@/components/ui/client-search';

describe('ClientSearch Component', () => {
  const mockClients = [
    { _id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
    { _id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
    { _id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '5555555555' }
  ];

  const mockOnClientSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search input', () => {
    render(<ClientSearch clients={mockClients} onClientSelect={mockOnClientSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search clients...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should display all clients initially', () => {
    render(<ClientSearch clients={mockClients} onClientSelect={mockOnClientSelect} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('should filter clients based on search term (name)', () => {
    render(<ClientSearch clients={mockClients} onClientSelect={mockOnClientSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search clients...');
    fireEvent.change(searchInput, { target: { value: 'john' } });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
  });

  it('should filter clients based on search term (email)', () => {
    render(<ClientSearch clients={mockClients} onClientSelect={mockOnClientSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search clients...');
    fireEvent.change(searchInput, { target: { value: 'jane@' } });
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
  });

  it('should filter clients based on search term (phone)', () => {
    render(<ClientSearch clients={mockClients} onClientSelect={mockOnClientSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search clients...');
    fireEvent.change(searchInput, { target: { value: '5555' } });
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('should display a message when no clients match the search', () => {
    render(<ClientSearch clients={mockClients} onClientSelect={mockOnClientSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search clients...');
    fireEvent.change(searchInput, { target: { value: 'xyz' } });
    
    expect(screen.getByText('No clients found')).toBeInTheDocument();
  });

  it('should call onClientSelect when a client is clicked', () => {
    render(<ClientSearch clients={mockClients} onClientSelect={mockOnClientSelect} />);
    
    const clientElement = screen.getByText('John Doe');
    fireEvent.click(clientElement);
    
    expect(mockOnClientSelect).toHaveBeenCalledWith('1');
  });

  it('should handle case-insensitive search', () => {
    render(<ClientSearch clients={mockClients} onClientSelect={mockOnClientSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search clients...');
    fireEvent.change(searchInput, { target: { value: 'JANE' } });
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
  });
});