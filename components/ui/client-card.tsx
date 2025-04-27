'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { IClient } from '@/types';

interface ClientCardProps {
  client: IClient;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white  dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <FaUser className="h-6 w-6 text-purple-500 dark:text-purple-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              {client.name} 
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{client.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Programs Enrolled</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {client.enrolledPrograms.length > 0 ? (
                client.enrolledPrograms.map((program, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    {program}
                  </span>
                ))
              ) : (
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  No programs enrolled
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
            <Link
              href={`/clients/${client._id}`}
              className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300"
            >
              View Details
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}