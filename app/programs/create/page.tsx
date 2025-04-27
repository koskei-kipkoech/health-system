'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../dashboard-layout';
import { Program, ProgramType } from '@/types'; // Assuming types are correctly exported from @/types
import DoctorSidebar from '@/components/ui/sidebar';

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
    
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DoctorSidebar/>
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-8 mt-20">


        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">Create New Health Program</h1>
        
        {error && (
          <div className="bg-red-100/90 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm relative mb-4" role="alert">
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
              className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-400 dark:hover:border-primary-600 text-gray-900 dark:text-white"
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
              className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-400 dark:hover:border-primary-600 text-gray-900 dark:text-white"
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
                className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-400 dark:hover:border-primary-600 text-gray-900 dark:text-white"
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
              className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-400 dark:hover:border-primary-600 text-gray-900 dark:text-white"
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
              className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-400 dark:hover:border-primary-600 text-gray-900 dark:text-white"
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
                className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-400 dark:hover:border-primary-600 text-gray-900 dark:text-white"
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
                className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-400 dark:hover:border-primary-600 text-gray-900 dark:text-white"
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
              className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-400 dark:hover:border-primary-600 text-gray-900 dark:text-white"
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
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-colors duration-200 text-sm font-medium shadow-sm w-full transform hover:scale-105 hover:shadow-md active:scale-95"
            >
              {isLoading ? 'Creating...' : 'Create Program'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProgramPage;