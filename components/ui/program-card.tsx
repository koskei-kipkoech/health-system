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
  // Handle goals display - split by new lines if it's a string
  const displayGoals = () => {
    if (!program.goals || program.goals.length === 0) {
      return <p className="text-neutral-600 dark:text-neutral-400">No goals specified</p>;
    }

    if (typeof program.goals === 'string') {
      return program.goals.split('\n').map((goal, index) => (
        <li key={index} className="text-neutral-800 dark:text-neutral-200 mb-1">
          {goal.trim()}
        </li>
      ));
    }

    // If goals is already an array
    return program.goals.map((goal, index) => (
      <li key={index} className="text-neutral-800 dark:text-neutral-200 mb-1">
        {goal}
      </li>
    ));
  };

  // Format date helper function
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
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
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
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

        <p className="text-neutral-600 dark:text-neutral-300 mb-6 text-base leading-relaxed">
          {program.description}
        </p>

        <div className="space-y-4">
          {/* Goals Section */}
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Goals</p>
            <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
              <ul className="list-disc pl-5">
                {displayGoals()}
              </ul>
            </div>
          </div>
          
          {/* Status Section */}
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Status</p>
            <span className={`inline-block px-2 py-1 text-sm rounded-full ${
              program.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
              program.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
              'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
            }`}>
              {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
            </span>
          </div>
          
          {/* Duration Section */}
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Duration</p>
            <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">Start:</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {formatDate(program.startDate)}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">End:</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {program.endDate ? formatDate(program.endDate) : 'Ongoing'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}