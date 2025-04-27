'use client';

import { useState, useEffect } from 'react';
import { Program, ProgramType } from '@/types';
import { motion } from 'framer-motion';

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (program: Program) => void;
  program?: Program;
}

const defaultProgram: Partial<Program> = {
  name: '',
  type: 'Other',
  description: '',
  goals: '',
  status: 'planned',
  startDate: new Date(),
};

const programTypes: ProgramType[] = ['TB', 'Malaria', 'HIV', 'Diabetes', 'Maternal', 'Other'];

export function ProgramModal({ isOpen, onClose, onSubmit, program }: ProgramModalProps) {
  const [formData, setFormData] = useState<Partial<Program>>(defaultProgram);

  useEffect(() => {
    if (program) {
      setFormData({
        ...program,
        startDate: program.startDate ? new Date(program.startDate) : new Date(),
        endDate: program.endDate ? new Date(program.endDate) : undefined,
      });
    } else {
      setFormData(defaultProgram);
    }
  }, [program]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Program);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {program ? 'Edit Program' : 'Add New Program'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Program Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Program Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ProgramType })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  required
                >
                  {programTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Goals
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate?.toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate?.toISOString().split('T')[0] || ''}
                    onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Program['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700"
                  required
                >
                  <option value="planned">Planned</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {program ? 'Update Program' : 'Create Program'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}