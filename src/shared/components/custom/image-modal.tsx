"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";

interface ImageModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      handlePrevious();
    } else if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-full max-h-full p-0 overflow-hidden "
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-[100vh]  flex items-center justify-center bg-background/90">
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Full screen image ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm z-10"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm z-10"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm z-10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
