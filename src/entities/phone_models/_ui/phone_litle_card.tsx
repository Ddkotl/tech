import Link from "next/link";
import { PartialPhoneModel } from "../_domain/types";
import { Card, CardContent, CardFooter, CardTitle } from "@/shared/components";
import Image from "next/image";

export function PhoneModelLitleCard({ model }: { model: PartialPhoneModel }) {
  return (
    <Link href={`/phone_model/${model.slug}`}>
      <Card className=" shadow-md transition-all  duration-300 hover:scale-105  hover:shadow-lg hover:bg-foreground/10  p-0 h-full flex flex-row ">
        <CardContent className="p-1">
          <Image
            src={model.main_image}
            alt={model.full_name}
            width={100} // Физический размер картинки
            height={146.5}
            className="w-7 h-10 object-fill mx-auto rounded-md" // Задаем фиксированные размеры
            priority
          />
        </CardContent>
        <CardFooter className="flex justify-center p-1">
          <CardTitle className="text-xs lg:text-sm font-thin flex text-start items-center justify-center">
            {model.full_name}
          </CardTitle>
        </CardFooter>
      </Card>
    </Link>
  );
}
