"use client";

import { Navbar } from "@/components/ui/navbar";
import BackgroundPaths from "@/components/home";
import AboutPage from "./about/page";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <BackgroundPaths title="Health💉" />
      <AboutPage />
    </div>
  );
}