import React from "react";
import { NavItem } from "./nav-item";
import { adminNavItems } from "../_settings/admin-nav-items";
import Link from "next/link";

export function DesktopNav({ logo }: { logo?: React.ReactNode }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 sm:flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-5">
        <Link href={"/"}>{logo}</Link>

        {adminNavItems.map((item) => {
          if (item.name !== "Настройки") {
            return (
              <NavItem key={item.name} href={item.path} label={item.name}>
                <item.icon className="h-6 w-6" />
              </NavItem>
            );
          }
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        {adminNavItems.map((item) => {
          if (item.name === "Настройки") {
            return (
              <NavItem key={item.name} href={item.path} label={item.name}>
                <item.icon className="h-6 w-6" />
              </NavItem>
            );
          }
        })}
      </nav>
    </aside>
  );
}
