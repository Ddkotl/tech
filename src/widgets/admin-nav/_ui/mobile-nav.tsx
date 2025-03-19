"use client";
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components";
import Link from "next/link";
import React from "react";
import { LuPanelLeft } from "react-icons/lu";
import { adminNavItems } from "../_settings/admin-nav-items";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

export function MobileNav({ logo }: { logo?: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <LuPanelLeft className="h-5 w-5" />
          <span className="sr-only">Раскрывающееся меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-1 text-lg font-medium">
          <SheetTitle className="sr-only">Админ Меню</SheetTitle>
          <SheetDescription className="sr-only">Админ меню, выберите пункт меню ниже</SheetDescription>
          <SheetHeader className=" border-b pb-5 mb-5">
            <SheetClose asChild>{logo}</SheetClose>
          </SheetHeader>
          {adminNavItems.map((item) => {
            return (
              <SheetClose key={item.name} asChild>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground p-2 rounded-lg",
                    {
                      "bg-accent text-foreground": pathname === item.path,
                    },
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
