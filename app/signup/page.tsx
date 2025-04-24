"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/ui/auth-form";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (data: any) => {
    // TODO: Implement actual signup logic here
    console.log("Signup data:", data);
    // Redirect to dashboard after successful signup
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <AuthForm type="signup" onSubmit={handleSignup} />
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}