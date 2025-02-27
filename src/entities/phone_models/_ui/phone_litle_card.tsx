import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle } from "@/shared/components";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

export function PhoneModelLitleCard({
  modelSlug,
  modelMainImage,
  modelFullName,
  className,
}: {
  modelSlug: string;
  modelMainImage: string;
  modelFullName: string;
  className?: string;
}) {
  return (
    <Link href={`/phone_model/${modelSlug}`}>
      <Card
        className={cn(
          " shadow-md transition-all  duration-300 hover:scale-105  hover:shadow-lg hover:bg-foreground/10  p-0 h-full flex flex-row ",
          className,
        )}
      >
        <CardContent className="p-1 image-safe">
          <Image
            src={modelMainImage}
            alt={modelFullName}
            width={100} // Физический размер картинки
            height={146.5}
            className="w-7 h-10 object-fill mx-auto rounded-md " // Задаем фиксированные размеры
          />
        </CardContent>
        <CardFooter className="flex justify-center p-1">
          <CardTitle className="text-xs lg:text-sm font-thin flex text-start items-center justify-center">
            {modelFullName}
          </CardTitle>
        </CardFooter>
      </Card>
    </Link>
  );
}
