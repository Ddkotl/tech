import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { NavItems } from "../settings/main-nav-items";

export function MobileMenu({
  logo,
  items,
}: {
  logo: React.ReactNode;
  items: NavItems[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle className="sr-only">Меню</SheetTitle>
        <SheetDescription className="sr-only">
          Главное меню, выберите пункт меню ниже
        </SheetDescription>
        <SheetHeader className=" border-b pb-5 mb-5">
          <SheetClose asChild>{logo}</SheetClose>
        </SheetHeader>
        <nav className="flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row ">
          {items.map((item, index) => (
            <SheetClose asChild key={index}>
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
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
