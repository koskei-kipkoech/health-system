"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BackButton } from "./back-button";

type AuthFormProps = {
  type: "login" | "signup";
  onSubmit: (data: any) => void;
};

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
    <BackButton/>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-neutral-900 dark:text-white">
        {type === "login" ? "Welcome Back" : "Create Account"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {type === "signup" && (
          <>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                Specialization
              </label>
              <input
                {...register("specialization", { required: "Specialization is required" })}
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {errors.specialization && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.specialization.message as string}
                </p>
              )}
            </div>
          </>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
          >
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
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
          >
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {type === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </motion.div>
    </>
  );
}