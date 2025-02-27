"use client";
import { cn } from "@/shared/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export function NavigationButton({
  slug,
  image,
  text,
  direction,
  className,
  isLoading,
}: {
  slug: string;
  image: string;
  text: string;
  direction: "prev" | "next";
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <Link
      href={isLoading ? "#" : `/phone_model/${slug}`}
      className={cn(
        "flex items-center gap-2 transition-all  duration-300 hover:scale-105  hover:shadow-lg hover:bg-foreground/10 border  p-2 rounded-2xl shadow-lg max-w-44",
        className,
        isLoading && "pointer-events-none opacity-50",
      )}
    >
      {direction === "next" && <ChevronLeft className="w-6 h-6" />}
      <div
        className={`flex ${direction === "next" ? "flex-row" : "flex-row-reverse"} items-center gap-2 lg:gap-4`}
      >
        {isLoading ? (
          <Skeleton className="w-7 h-10 rounded-md" />
        ) : (
          <Image
            src={image}
            alt={text}
            width={50}
            height={75}
            className="w-7 h-10 object-cover rounded-md image-safe"
          />
        )}
        {isLoading ? (
          <Skeleton className="w-16 h-4 rounded-md" />
        ) : (
          <span className="text-xs lg:text-sm font-extralight text-center">
            {text}
          </span>
        )}
      </div>
      {direction === "prev" && <ChevronRight className="w-6 h-6" />}
    </Link>
  );
}
