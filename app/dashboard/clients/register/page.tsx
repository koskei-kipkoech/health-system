"use client";

import { ClientRegistrationForm } from '@/components/ui/client-form';
import { ProtectedRoute } from '@/components/protected-route';

export default function RegisterClientPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <ClientRegistrationForm />
      </div>
    </ProtectedRoute>
  );
}