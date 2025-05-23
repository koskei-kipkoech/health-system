'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { IClient } from '@/types';

interface Program {
  _id: string;
  name: string;
}

interface ClientModalProps {
  client: IClient | null;
  isOpen: boolean;
  onClose: () => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ client, isOpen, onClose }) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && client?.enrolledPrograms && client.enrolledPrograms.length > 0) {
      fetchProgramDetails();
    }
  }, [isOpen, client]);

  const fetchProgramDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/programs');
      if (!response.ok) throw new Error('Failed to fetch programs');
      const data = await response.json();
      setPrograms(data.data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!client) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[75vh] overflow-auto backdrop-blur-sm ring-1 ring-black/5">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {client.name}
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                        <p className="text-gray-900 dark:text-white">{client.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                        <p className="text-gray-900 dark:text-white">{client.phone || 'No phone number provided'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</label>
                        <p className="text-gray-900 dark:text-white">
                          {client.dateOfBirth ? new Date(client.dateOfBirth).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'No date of birth provided'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</label>
                        <p className="text-gray-900 dark:text-white">
                          {client.address ? (
                            <>
                              {client.address.street}<br />
                              {client.address.city}, {client.address.state} {client.address.zipCode}
                            </>
                          ) : (
                            'No address provided'
                          )}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <label className="text-lg font-semibold text-gray-900 dark:text-white mb-4 block">Medical History</label>
                        <div className="space-y-4">
                          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Conditions:</h4>
                            <p className="text-gray-900 dark:text-white text-base">{client.medicalHistory.conditions.join(', ') || 'None'}</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Allergies:</h4>
                            <p className="text-gray-900 dark:text-white text-base">{client.medicalHistory.allergies.join(', ') || 'None'}</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Medications:</h4>
                            <p className="text-gray-900 dark:text-white text-base">{client.medicalHistory.medications.join(', ') || 'None'}</p>
                          </div>
                          {client.medicalHistory.notes && (
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes:</h4>
                              <p className="text-gray-900 dark:text-white text-base">{client.medicalHistory.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Emergency Contact</label>
                        <div className="mt-2">
                          <p className="text-gray-900 dark:text-white">{client.emergencyContact.name}</p>
                          <p className="text-gray-600 dark:text-gray-300">{client.emergencyContact.relationship}</p>
                          <p className="text-gray-600 dark:text-gray-300">{client.emergencyContact.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Enrolled Programs</h2>
                    {client.enrolledPrograms && client.enrolledPrograms.length > 0 ? (
                      <div className="space-y-3">
                        {loading ? (
                          <p className="text-gray-500 dark:text-gray-400">Loading programs...</p>
                        ) : (
                          client.enrolledPrograms.map((programId) => {
                            const program = programs.find(p => p._id === programId);
                            return (
                              <div
                                key={programId}
                                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                              >
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {program ? program.name : 'Loading...'}
                                </h3>
                              </div>
                            );
                          })
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No programs enrolled</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Registration Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Registered On</label>
                      <p className="text-gray-900 dark:text-white">
                        {client.registrationDate ? new Date(client.registrationDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Not available'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                      <p className="text-gray-900 dark:text-white">
                        {client.updatedAt ? new Date(client.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: 'UTC'
                        }) : 'Not available'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ClientModal;