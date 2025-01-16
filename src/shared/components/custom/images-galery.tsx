"use client";

import { useState } from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="p-0 w-full h-40 overflow-hidden"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Изображение ${index + 1}`}
                width={300}
                height={200}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
              />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-full h-[80vh] flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`Изображение ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
