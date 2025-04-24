"use client";

import { Navbar } from "@/components/ui/navbar";
import BackgroundPaths from "@/components/home";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <BackgroundPaths title="Health" />
    </div>
  );
}