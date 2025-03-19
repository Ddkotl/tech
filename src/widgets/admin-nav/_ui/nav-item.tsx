"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components";
import { cn } from "@/shared/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex p-2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground ",
              {
                "bg-accent text-foreground": pathname === href,
              },
            )}
          >
            {children}
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
