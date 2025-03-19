import { LogoIcon } from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import React from "react";

export function Logo({ className, isText = false }: { className?: string; isText?: boolean }) {
  return (
    <Link className="flex items-center space-x-2" href="/">
      <LogoIcon className={cn("h-10 w-10", className)} />
      {isText ? <span className="font-bold inline-block">Tech</span> : ""}
    </Link>
  );
}
