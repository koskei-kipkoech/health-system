'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { motion } from 'framer-motion';
import DoctorSidebar from '@/components/ui/sidebar';
import { ClientSearch } from '@/components/ui/client-search';
import { ClientProfile } from '@/components/ui/client-profile';
import Link from 'next/link';

// Define Client interface outside the component
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

const DashboardPage = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    // This state should ideally be handled by the redirect, but added as a fallback
    return null; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black/20 dark:to-black">
      <div className="flex h-screen">
        <DoctorSidebar />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome, Dr. {user.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Manage your clients and programs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick access card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Clients</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                View and manage your client list, search for specific clients, and access their profiles.  
              </p>
              <Link 
                href="/clients" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Clients
              </Link>
            </motion.div>

            {/* Programs card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Programs</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create and manage health programs, and enroll clients in appropriate programs.
              </p>
              <Link 
                href="/programs/create" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Manage Programs
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;