"use client";

import { useEffect, useState, useTransition } from "react";
import { Input } from "@/shared/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { PartialReviewsWithTags } from "../_domain/types";
import { searchReview } from "../_actions/search_review";
import { ReviewsList } from "./reviews_list";

export function ReviewsSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReviews, setFilteredReviews] = useState<PartialReviewsWithTags[] | []>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredReviews([]);
      setIsOpen(false);
      return;
    }

    // Дебаунс запросов
    const timeout = setTimeout(() => {
      startTransition(async () => {
        setIsOpen(true); // Открываем модалку сразу, чтобы показать "Загрузка..."
        const results = await searchReview(searchTerm);
        setFilteredReviews(results);
      });
    }, 700);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="relative w-full">
      {/* Поле ввода */}
      <Input
        type="text"
        name="search"
        placeholder="🔍 Поиск обзора по названию..."
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
              className="absolute  top-full mt-2  max-w-[90vw] -translate-x-1/2 left-0 md:-left-full rounded-lg border p-4 shadow-lg bg-background border-foreground/20 z-20"
            >
              <h2 className="text-center text-lg font-semibold text-muted-foreground mb-2">Результаты поиска</h2>

              {loading ? (
                <p className="text-center text-muted-foreground">Загрузка...</p>
              ) : filteredReviews.length > 0 ? (
                <ReviewsList reviews={filteredReviews} />
              ) : (
                <p className="text-center text-muted-foreground">Обзоры не найдены</p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
