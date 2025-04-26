'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DoctorSidebar from '@/components/ui/sidebar';
import { ProgramSelection } from '@/components/ui/program-selection';
import { Program } from '@/types';

export default function ProgramEnrollment() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch clients when component mounts
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      if (data.success) {
        setClients(data.data);
      } else {
        setError('Failed to fetch clients');
      }
    } catch (err) {
      setError('Error fetching clients');
      console.error(err);
    }
  };

  const handleEnrollment = async () => {
    if (!selectedClient || selectedPrograms.length === 0) {
      setError('Please select a client and at least one program');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/clients/${selectedClient}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ programIds: selectedPrograms }),
      });

      const data = await response.json();
      if (data.success) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Failed to enroll in programs');
      }
    } catch (err) {
      setError('Error during enrollment process');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <DoctorSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Program Enrollment</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Client
              </label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
              >
                <option value="">Choose a client</option>
                {clients.map((client: any) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Programs
              </label>
              <ProgramSelection
                onProgramsSelected={setSelectedPrograms}
                selectedPrograms={selectedPrograms}
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleEnrollment}
                disabled={loading}
                className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                {loading ? 'Enrolling...' : 'Enroll in Programs'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}