"use client";

import { useState } from 'react';
import { Button } from './button';

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
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
}

export function ClientRegistrationForm() {
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    medicalHistory: {
      conditions: [],
      allergies: [],
      medications: [],
      notes: ''
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys.length === 1) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => {
        const nestedField = prev[keys[0] as keyof ClientFormData] as Record<string, any>;
        return {
          ...prev,
          [keys[0]]: {
            ...nestedField,
            [keys[1]]: value
          }
        };
      });
    }
  };

  const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [field]: values
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: { street: '', city: '', state: '', zipCode: '' },
        medicalHistory: { conditions: [], allergies: [], medications: [], notes: '' },
        emergencyContact: { name: '', relationship: '', phone: '' }
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Client Registration</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <fieldset className="border rounded-md p-4">
          <legend className="text-sm font-medium text-gray-700 px-2">Address</legend>
          <div className="space-y-3">
            <input
              type="text"
              name="address.street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="address.city"
                placeholder="City"
                value={formData.address.city}
                onChange={handleInputChange}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address.state"
                placeholder="State"
                value={formData.address.state}
                onChange={handleInputChange}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              name="address.zipCode"
              placeholder="ZIP Code"
              value={formData.address.zipCode}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </fieldset>

        <fieldset className="border rounded-md p-4">
          <legend className="text-sm font-medium text-gray-700 px-2">Medical History</legend>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600">Medical Conditions (comma-separated)</label>
              <input
                type="text"
                value={formData.medicalHistory.conditions.join(', ')}
                onChange={(e) => handleArrayInput(e, 'conditions')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Allergies (comma-separated)</label>
              <input
                type="text"
                value={formData.medicalHistory.allergies.join(', ')}
                onChange={(e) => handleArrayInput(e, 'allergies')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Medications (comma-separated)</label>
              <input
                type="text"
                value={formData.medicalHistory.medications.join(', ')}
                onChange={(e) => handleArrayInput(e, 'medications')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Additional Notes</label>
              <textarea
                name="medicalHistory.notes"
                value={formData.medicalHistory.notes}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded-md p-4">
          <legend className="text-sm font-medium text-gray-700 px-2">Emergency Contact</legend>
          <div className="space-y-3">
            <input
              type="text"
              name="emergencyContact.name"
              placeholder="Contact Name"
              value={formData.emergencyContact.name}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="text"
              name="emergencyContact.relationship"
              placeholder="Relationship"
              value={formData.emergencyContact.relationship}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="emergencyContact.phone"
              placeholder="Phone Number"
              value={formData.emergencyContact.phone}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </fieldset>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Registering...' : 'Register Client'}
      </Button>
    </form>
  );
}