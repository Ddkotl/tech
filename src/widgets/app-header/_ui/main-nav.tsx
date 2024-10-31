import Link from "next/link";
import { NavItems } from "./main-nav-items";

export function MainNav({ items }: { items: NavItems[] }) {
  return (
    <nav className="flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row ">
      {items.map((item, index) => (
        <Link
          key={index}
          className="transition-colors hover:text-foreground/80 text-foreground/60"
          href={item.path}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
