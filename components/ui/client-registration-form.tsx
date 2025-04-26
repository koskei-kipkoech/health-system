"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { ProgramSelection } from "./program-selection";

interface ClientFormData {
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

export function ClientRegistrationForm({ onSubmit }: { onSubmit: (data: ClientFormData) => void }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ClientFormData>();

  const handleProgramsSelected = (programIds: string[]) => {
    setValue('enrolledPrograms', programIds);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-white/80 dark:from-neutral-900 dark:to-neutral-900/90 rounded-3xl shadow-2xl mt-20 max-h-[85vh] overflow-y-auto transition-all duration-300 hover:shadow-3xl backdrop-blur-lg border border-white/20 dark:border-neutral-800/30"
      >
        <h2 className="text-3xl font-bold text-center mb-8  dark:text-white bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Client Registration
        </h2>
        <form onSubmit={handleSubmit(async (data) => {
      await onSubmit(data);
      reset();
      router.push('/dashboard');
    })} className="space-y-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="space-y-6 bg-white/50 dark:bg-neutral-800/50 p-6 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-700 pb-3">
                Personal Information
              </h3>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Full Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-400 dark:hover:border-primary-600"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Phone Number
                </label>
                <input
                  {...register("phone", { required: "Phone number is required" })}
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Date of Birth
                </label>
                <input
                  {...register("dateOfBirth", { required: "Date of birth is required" })}
                  type="date"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-6 bg-gradient-to-br from-white/80 to-white/60 dark:from-neutral-800/80 dark:to-neutral-800/60 p-6 rounded-2xl backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 border border-white/10 dark:border-neutral-700/30 mt-8">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-700 pb-3">
                Address
              </h3>
              <div>
                <label htmlFor="address.street" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Street Address
                </label>
                <input
                  {...register("address.street", { required: "Street address is required" })}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.address?.street && <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address.city" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    City
                  </label>
                  <input
                    {...register("address.city", { required: "City is required" })}
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  {errors.address?.city && <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>}
                </div>
                <div>
                  <label htmlFor="address.state" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    State
                  </label>
                  <input
                    {...register("address.state", { required: "State is required" })}
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  {errors.address?.state && <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="address.zipCode" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  ZIP Code
                </label>
                <input
                  {...register("address.zipCode", { required: "ZIP code is required" })}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.address?.zipCode && <p className="mt-1 text-sm text-red-600">{errors.address.zipCode.message}</p>}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-6 bg-gradient-to-br from-white/80 to-white/60 dark:from-neutral-800/80 dark:to-neutral-800/60 p-6 rounded-2xl backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 border border-white/10 dark:border-neutral-700/30 mt-8">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-700 pb-3">
                Emergency Contact
              </h3>
              <div>
                <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Contact Name
                </label>
                <input
                  {...register("emergencyContact.name", { required: "Emergency contact name is required" })}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.emergencyContact?.name && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.name.message}</p>}
              </div>
              <div>
                <label htmlFor="emergencyContact.relationship" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Relationship
                </label>
                <input
                  {...register("emergencyContact.relationship", { required: "Relationship is required" })}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.emergencyContact?.relationship && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.relationship.message}</p>}
              </div>
              <div>
                <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Contact Phone
                </label>
                <input
                  {...register("emergencyContact.phone", { required: "Emergency contact phone is required" })}
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.emergencyContact?.phone && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.phone.message}</p>}
              </div>
            </div>

            {/* Program Selection */}
            <div className="space-y-6 bg-white/50 dark:bg-neutral-800/50 p-6 rounded-2xl backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 border border-white/10 dark:border-neutral-700/30 mt-8">
              <ProgramSelection onProgramsSelected={handleProgramsSelected} />
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              Register Client
            </Button>
          </div>
        </form>
      </motion.div>
    </>
  );
}