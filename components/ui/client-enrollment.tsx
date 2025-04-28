'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Program {
  _id: string;
  name: string;
  type: string;
}

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  enrolledPrograms: string[];
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
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  registrationDate: string;
}

interface ClientEnrollmentProps {
  client: Client;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ClientEnrollment: React.FC<ClientEnrollmentProps> = ({
  client,
  onSuccess,
  onCancel,
}) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(client.enrolledPrograms || []);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/programs');
        if (!response.ok) throw new Error('Failed to fetch programs');
        const data = await response.json();
        setPrograms(data.data || []);
      } catch (err) {
        setError('Failed to load programs. Please try again.');
        console.error('Error fetching programs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleProgramToggle = (programId: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(programId)
        ? prev.filter((id) => id !== programId)
        : [...prev, programId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/clients/${client._id}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ programIds: selectedPrograms }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to enroll client');
      }

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error enrolling client:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full mx-auto"
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Enroll {client.name} in Programs
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
          Client successfully enrolled in selected programs!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Available Programs
          </h3>
          {loading ? (
            <div className="text-center py-4">Loading programs...</div>
          ) : programs.length === 0 ? (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              No programs available
            </div>
          ) : (
            <div className="space-y-3">
              {programs.map((program) => (
                <div key={program._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`program-${program._id}`}
                    checked={selectedPrograms.includes(program._id)}
                    onChange={() => handleProgramToggle(program._id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`program-${program._id}`}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {program.name} ({program.type})
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              disabled={submitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
            disabled={submitting || loading}
          >
            {submitting ? 'Enrolling...' : 'Enroll in Selected Programs'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};