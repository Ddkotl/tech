"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/shared/components/ui/input";
import { BrandList } from "@/entities/brands/_ui/brands_list";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

export function BrandSearch({
  brands,
  className,
}: {
  brands: Prisma.BrandsGetPayload<{
    include: { _count: { select: { phones: true } } };
  }>[];
  className?: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Фильтруем бренды
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Открываем модалку при вводе текста
  useEffect(() => {
    setIsOpen(searchTerm.length > 0);
  }, [searchTerm]);

  // Закрытие при клике вне модалки
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full  ">
      {/* Поле ввода */}
      <Input
        type="text"
        placeholder="🔍 Поиск бренда по названию..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={cn(
          "w-full max-w-lg text-center mx-auto md:ml-auto md:mr-0 ",
          className,
        )}
      />

      {/* Модальное окно с результатами */}
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="absolute w-full max-w-xs -translate-x-1/2 rounded-lg border  p-4 shadow-lg bg-background border-foreground/20"
        >
          {filteredBrands.length > 0 ? (
            <BrandList brands={filteredBrands} />
          ) : (
            <p className="text-center text-muted-foreground">
              Бренды не найдены
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
