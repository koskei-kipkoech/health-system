'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
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
    notes: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  enrolledPrograms: string[];
}

interface ClientProfileProps {
  client: Client;
  onClose: () => void;
}

export const ClientProfile: React.FC<ClientProfileProps> = ({ client, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full mx-auto"
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{client.name}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contact Information</h3>
            <p className="text-gray-600 dark:text-gray-300">Email: {client.email}</p>
            <p className="text-gray-600 dark:text-gray-300">Phone: {client.phone}</p>
            <p className="text-gray-600 dark:text-gray-300">Date of Birth: {client.dateOfBirth}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Address</h3>
            <p className="text-gray-600 dark:text-gray-300">{client.address.street}</p>
            <p className="text-gray-600 dark:text-gray-300">
              {client.address.city}, {client.address.state} {client.address.zipCode}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Emergency Contact</h3>
            <p className="text-gray-600 dark:text-gray-300">{client.emergencyContact.name}</p>
            <p className="text-gray-600 dark:text-gray-300">{client.emergencyContact.relationship}</p>
            <p className="text-gray-600 dark:text-gray-300">{client.emergencyContact.phone}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Enrolled Programs</h3>
            {client.enrolledPrograms.length > 0 ? (
              <ul className="space-y-2">
                {client.enrolledPrograms.map((program, index) => (
                  <li
                    key={index}
                    className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm inline-block mr-2 mb-2"
                  >
                    {program}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No programs enrolled</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Medical History</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Conditions</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  {client.medicalHistory.conditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Allergies</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  {client.medicalHistory.allergies.map((allergy, index) => (
                    <li key={index}>{allergy}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Medications</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  {client.medicalHistory.medications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              </div>
              {client.medicalHistory.notes && (
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Notes</h4>
                  <p className="text-gray-600 dark:text-gray-400">{client.medicalHistory.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};