'use client';

import { Navbar } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import DoctorSidebar from "@/components/ui/sidebar";
import { AuthProvider } from '@/lib/auth';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 ">
        <DoctorSidebar  />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
      
    </AuthProvider>
  );
}