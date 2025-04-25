"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // The actual navigation is handled by Next.js Link
  };

  return (
    <div className="mt-4 absolute top-4 left-4">
      <Link href="/">
        <Button
          variant="ghost"
          className="flex ml-10 mt-15 mb-3 items-center gap-5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:shadow-lg"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </>
          )}
        </Button>
      </Link>
    </div>
  );
}