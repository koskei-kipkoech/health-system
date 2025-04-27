'use client';

import { ClientRegistrationForm } from '@/components/ui/client-registration-form';
import type { ClientFormData } from '@/components/ui/client-form';
import DashboardLayout from '../../dashboard-layout';

export default function RegisterClientPage() {
  const handleSubmit = async (data: ClientFormData) => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to register client');
      }

      // Handle successful registration
      console.log('Client registered successfully');
    } catch (error) {
      console.error('Error registering client:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <ClientRegistrationForm onSubmit={handleSubmit} />
      </div>
    </DashboardLayout>
  );
}