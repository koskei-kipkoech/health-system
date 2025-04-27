'use client';

import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Program } from '@/types';

interface ProgramCardProps {
  program: Program;
  onEdit?: (program: Program) => void;
  onDelete?: (programId: string) => void;
}

export function ProgramCard({ program, onEdit, onDelete }: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
              {program.name}
            </h3>
            <span className="inline-block px-2 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 mb-3">
              {program.type}
            </span>
          </div>
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(program)}
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Edit program"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(program._id || program.id)}
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                aria-label="Delete program"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
          {program.description}
        </p>

        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Goals</p>
            <p className="text-neutral-800 dark:text-neutral-200">{program.goals}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Status</p>
            <span className={`inline-block px-2 py-1 text-sm rounded-full ${
              program.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
              program.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
              'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
            }`}>
              {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Duration</p>
            <p className="text-neutral-800 dark:text-neutral-200">
              {new Date(program.startDate).toLocaleDateString()} - 
              {program.endDate ? new Date(program.endDate).toLocaleDateString() : 'Ongoing'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}