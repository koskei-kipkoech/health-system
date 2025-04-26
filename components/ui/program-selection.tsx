"use client";

import { useState, useEffect } from 'react';
import { IProgram } from '@/types';

interface ProgramSelectionProps {
  onProgramsSelected: (programIds: string[]) => void;
  selectedPrograms?: string[];
}

export const ProgramSelection = ({ onProgramsSelected, selectedPrograms = [] }: ProgramSelectionProps) => {
  const [programs, setPrograms] = useState<IProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(selectedPrograms));

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs');
        if (!response.ok) throw new Error('Failed to fetch programs');
        const data = await response.json();
        setPrograms(data.data || []);
      } catch (err) {
        setError('Failed to load programs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleProgramToggle = (programId: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(programId)) {
      newSelected.delete(programId);
    } else {
      newSelected.add(programId);
    }
    setSelected(newSelected);
    onProgramsSelected(Array.from(newSelected));
  };

  if (loading) return <div className="text-center py-4">Loading programs...</div>;
  if (error) return <div className="text-red-500 py-4">{error}</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Program Enrollment</h3>
      <div className="space-y-2">
        {programs.map((program) => (
          <label
            key={program._id}
            className="flex items-center space-x-3 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={selected.has(program._id || '')}
              onChange={() => handleProgramToggle(program._id || '')}
              className="h-5 w-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 dark:border-neutral-600"
            />
            <div className="flex-1">
              <div className="font-medium text-neutral-900 dark:text-neutral-100">{program.name}</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">{program.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}