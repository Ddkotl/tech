// Sidebar.tsx
import { REVALIDATE_TIME } from "@/shared/lib/config/public";
import React, { ReactNode } from "react";

export const revalidate = REVALIDATE_TIME;

export const Sidebar = ({
  children1,
  children2,
  children3,
  children4,
  children5,
}: {
  children1?: ReactNode;
  children2?: ReactNode;
  children3?: ReactNode;
  children4?: ReactNode;
  children5?: ReactNode;
}) => {
  return (
    <aside className="hidden  md:block   p-4  bg-card border border-foreground/10 shadow-lg rounded-xl md:w-56 lg:w-80">
      <div className="flex flex-col gap-2 lg:gap-4">
        {children1}
        {children2}
        {children3}
        {children4}
        {children5}
      </div>
    </aside>
  );
};
