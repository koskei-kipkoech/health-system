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
      <div className="flex">
        <DoctorSidebar />
        <main className="flex-grow p-6">{children}</main>
      </div>
      <Footer />
    </AuthProvider>
  );
}