"use client";

import { useEffect, useState, useTransition } from "react";
import { Input } from "@/shared/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { PartialPhoneModel } from "../_domain/types";
import { searchPhoneModel } from "../_actions/search_phone_model";
import { PhoneModelsList } from "./phome_model_list";

export function PhoneModelSearch({ brandSlug }: { brandSlug: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPhoneModels, setFilteredPhoneModels] = useState<
    PartialPhoneModel[] | []
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPhoneModels([]);
      setIsOpen(false);
      return;
    }

    // Дебаунс запросов
    const timeout = setTimeout(() => {
      startTransition(async () => {
        setIsOpen(true); // Открываем модалку сразу, чтобы показать "Загрузка..."
        const results = await searchPhoneModel(brandSlug, searchTerm);
        setFilteredPhoneModels(results);
      });
    }, 700);

    return () => clearTimeout(timeout);
  }, [searchTerm, brandSlug]);

  return (
    <div className="relative w-full">
      {/* Поле ввода */}
      <Input
        type="text"
        placeholder="🔍 Поиск модели текущего брэнда..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-lg text-center mx-auto md:ml-auto md:mr-0"
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
              className="fixed inset-0 bg-foreground/50 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Модальное окно с результатами */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute  top-full mt-2 w-full max-w-md -translate-x-1/2 rounded-lg border p-4 shadow-lg bg-background border-foreground/20 z-20"
            >
              <h2 className="text-center text-lg font-semibold text-muted-foreground mb-2">
                Результаты поиска
              </h2>

              {loading ? (
                <p className="text-center text-muted-foreground">Загрузка...</p>
              ) : filteredPhoneModels.length > 0 ? (
                <PhoneModelsList models={filteredPhoneModels} />
              ) : (
                <p className="text-center text-muted-foreground">
                  Бренды не найдены
                </p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
