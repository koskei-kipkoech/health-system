'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

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
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome, Dr. {user.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your Dashboard
          </p>
        </motion.div>

        {/* Placeholder for Dashboard Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Dashboard Overview</h2>
          <p className="text-gray-600 dark:text-gray-300">
            This is your personalized dashboard. More features coming soon!
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Your specialization: {user.specialization || 'Not specified'}
          </p>
          <button 
            onClick={logout} 
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;