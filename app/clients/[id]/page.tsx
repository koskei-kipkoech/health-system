'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import DoctorSidebar from '@/components/ui/sidebar';
import { IClient } from '@/types';

const ClientProfilePage = () => {
  const { id } = useParams();
  const [client, setClient] = useState<IClient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const fetchClientDetails = async () => {
    try {
      const response = await fetch(`/api/clients/${id}`);
      if (!response.ok) throw new Error('Failed to fetch client details');
      const data = await response.json();
      setClient(data);
    } catch (error) {
      console.error('Error fetching client details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!client) {
    return <div className="min-h-screen flex items-center justify-center">Client not found</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DoctorSidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {client.firstName} {client.lastName}
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
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Number</label>
                      <p className="text-gray-900 dark:text-white">{client.contactNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(client.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</label>
                      <p className="text-gray-900 dark:text-white capitalize">{client.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</label>
                      <p className="text-gray-900 dark:text-white">{client.address}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Enrolled Programs</h2>
                  {client.enrolledPrograms.length > 0 ? (
                    <div className="space-y-3">
                      {client.enrolledPrograms.map((program, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <h3 className="font-medium text-gray-900 dark:text-white">{program}</h3>
                        </div>
                      ))}
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
                      {new Date(client.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(client.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;