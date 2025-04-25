"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/ui/auth-form";
import { useAuth } from "@/lib/auth";
import { BackButton } from "@/components/ui/back-button";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (data: any) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      // Store token and login user
      sessionStorage.setItem('token', result.token);
      login({
        name: result.user.name,
        email: result.user.email,
        specialization: result.user.specialization
      });
      
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <AuthForm type="login" onSubmit={handleLogin} />
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          Sign up
        </Link>
      </p>
      
    </div>
  );
}