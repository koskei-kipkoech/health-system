'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Program } from '@/types';
import { ProgramCard } from '@/components/ui/program-card';
import { ProgramModal } from '@/components/ui/program-modal';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | undefined>();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs');
      if (!response.ok) throw new Error('Failed to fetch programs');
      const data = await response.json();
      setPrograms(data.data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedProgram(undefined);
    setIsModalOpen(true);
  };

  const handleSubmit = async (program: Program) => {
    const programId = program?._id || program?.id;
    const isNewProgram = !programId;

    try {
      const response = await fetch(
        isNewProgram ? '/api/programs' : `/api/programs/${programId}`,
        {
          method: isNewProgram ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(program),
        }
      );

      if (!response.ok) throw new Error(`Failed to ${isNewProgram ? 'create' : 'update'} program`);
      
      // Refresh programs list
      fetchPrograms();
    } catch (error) {
      console.error(`Error ${isNewProgram ? 'creating' : 'updating'} program:`, error);
    }
  };

  const handleDelete = async (programId: string) => {
    if (!programId) {
      console.error('Invalid program ID');
      return;
    }

    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      const response = await fetch(`/api/programs/${programId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete program');
      
      // Refresh programs list
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 mt-15 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-between items-center"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Programs Overview</h1>
            <button
              onClick={handleCreate}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add New Program
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <ProgramCard
                key={program._id || program.id}
                program={program}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {programs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No programs found</p>
            </div>
          )}
        </div>
      </div>
      <ProgramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        program={selectedProgram}
      />
    </div>
  );
}
