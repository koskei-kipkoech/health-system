'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../dashboard-layout';
import { Program, ProgramType } from '@/types'; // Assuming types are correctly exported from @/types

const CreateProgramPage = () => {
  const router = useRouter();
  const [programData, setProgramData] = useState<Partial<Program>>({
    name: '',
    type: 'TB', // Default type
    description: '',
    goals: '',
    startDate: new Date(),
    endDate: undefined,
    status: 'planned',
  });
  const [customType, setCustomType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProgramData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProgramData(prev => ({ ...prev, [name]: value ? new Date(value) : undefined }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ProgramType;
    setProgramData(prev => ({ ...prev, type: value }));
    if (value !== 'Other') {
      setCustomType(''); // Clear custom type if a predefined type is selected
    }
  };

  const handleCustomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomType(e.target.value);
    // Update programData.type only if 'Other' is selected
    if (programData.type === 'Other') {
      setProgramData(prev => ({ ...prev, type: e.target.value || 'Other' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const finalProgramData = {
      ...programData,
      type: programData.type === 'Other' ? customType || 'Other' : programData.type,
      startDate: programData.startDate ? new Date(programData.startDate) : new Date(), // Ensure date format
      endDate: programData.endDate ? new Date(programData.endDate) : undefined,
    };

    // Basic frontend validation
    if (!finalProgramData.name || !finalProgramData.type || !finalProgramData.description || !finalProgramData.goals || !finalProgramData.startDate || !finalProgramData.status) {
        setError('Please fill in all required fields.');
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalProgramData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create program');
      }

      // Optionally redirect to a success page or the programs list
      router.push('/dashboard'); // Redirect to dashboard for now

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const programTypes: ProgramType[] = ['TB', 'Malaria', 'HIV', 'Diabetes', 'Maternal', 'Other'];

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 mt-10 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Health Program</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Program Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={programData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Program Type</label>
            <select
              id="type"
              name="type"
              value={programData.type === 'Other' || !programTypes.includes(programData.type as ProgramType) ? 'Other' : programData.type}
              onChange={handleTypeChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
            >
              {programTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {programData.type === 'Other' && (
            <div>
              <label htmlFor="customType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specify Other Type</label>
              <input
                type="text"
                id="customType"
                name="customType"
                value={customType}
                onChange={handleCustomTypeChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
              />
            </div>
          )}

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={programData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
            ></textarea>
          </div>

          <div>
            <label htmlFor="goals" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Goals</label>
            <textarea
              id="goals"
              name="goals"
              rows={3}
              value={programData.goals}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={programData.startDate ? (programData.startDate instanceof Date ? programData.startDate.toISOString().split('T')[0] : programData.startDate) : ''}
                onChange={handleDateChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date (Optional)</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={programData.endDate ? (programData.endDate instanceof Date ? programData.endDate.toISOString().split('T')[0] : programData.endDate) : ''}
                onChange={handleDateChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select
              id="status"
              name="status"
              value={programData.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
            >
              <option value="planned">Planned</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
            >
              {isLoading ? 'Creating...' : 'Create Program'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default CreateProgramPage;