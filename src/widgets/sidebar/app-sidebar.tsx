// Sidebar.tsx
import React from "react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="hidden  md:block   p-4 w-full bg-card border border-foreground/10 shadow-lg rounded-xl md:w-56 lg:w-80">
      <div>
        <h3 className="text-lg font-semibold mb-4">Навигация</h3>
        <ul className="space-y-2">
          <li>
            <Link href="#overview" className="text-blue-600 hover:underline">
              Обзор
            </Link>
          </li>
          <li>
            <Link
              href="#specifications"
              className="text-blue-600 hover:underline"
            >
              Характеристики
            </Link>
          </li>
          <li>
            <Link href="#gallery" className="text-blue-600 hover:underline">
              Галерея
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
