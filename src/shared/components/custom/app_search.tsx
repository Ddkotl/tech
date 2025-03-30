"use client";

import { useEffect, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Title } from "@/shared/components";

export function AppSearch({ placeholder, list }: { placeholder: string; list: ({ ...props }) => React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setIsOpen(false);
      return;
    }

    // Дебаунс запросов
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 700);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-[350px] xs1:max-w-[800px]">
      {/* Поле ввода */}
      <Input
        type="text"
        name="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-lg text-center mx-auto md:ml-auto md:mr-0 "
      />

      {/* Затемнение фона при открытой модалке */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Затемнение */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-foreground/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Модальное окно с результатами */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute  top-full mt-2  max-w-[90vw] -translate-x-1/2 left-0 md:-left-full rounded-lg border p-4 shadow-lg bg-background border-foreground/20 z-50"
            >
              <Title size="lg" text="Результаты поиска" />
              {list({ searchTerm: searchTerm })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
