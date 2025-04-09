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
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { NavItems } from "../_settings/main-nav-items";
import { cn } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";

export function MobileMenu({ logo, items }: { logo: React.ReactNode; items: NavItems[] }) {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" name="меню" aria-label="меню">
          <Menu className="text-fio h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle className="sr-only">Меню</SheetTitle>
        <SheetDescription className="sr-only">Главное меню, выберите пункт меню ниже</SheetDescription>
        <SheetHeader className=" border-b pb-5 mb-5">
          <SheetClose asChild>{logo}</SheetClose>
        </SheetHeader>
        <nav className="flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row ">
          {items.map((item, index) => (
            <SheetClose asChild key={index}>
              <Link
                className={cn(
                  "flex items-center w-full gap-4 px-2.5 text-muted-foreground hover:text-foreground p-2 rounded-lg",
                  {
                    "bg-accent text-foreground": pathname === item.path,
                  },
                )}
                href={item.path}
              >
                {item.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
