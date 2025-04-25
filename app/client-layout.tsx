// app/client-layout.tsx
"use client";

import { Navbar } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { AuthProvider } from '@/lib/auth';
import React from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </AuthProvider>
  );
}