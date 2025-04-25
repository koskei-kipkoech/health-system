'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { motion } from 'framer-motion';
import DoctorSidebar from '@/components/ui/sidebar';

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
        <DoctorSidebar/>
      </div>
      
    </div>
    
  );
};

export default DashboardPage;