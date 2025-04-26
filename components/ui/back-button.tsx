"use client";

import Link from "next/link";
import { Button } from "./button";

export function BackButton() {
  return (
    <div className="mt-4 text-center">
      <Link href="/">
        <Button
          variant="ghost"
          className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  );
}