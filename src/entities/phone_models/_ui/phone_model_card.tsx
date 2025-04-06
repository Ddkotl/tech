import Link from "next/link";
import { PartialPhoneModel } from "../_domain/types";
import { Card, CardContent, CardFooter, CardTitle, Skeleton } from "@/shared/components";
import Image from "next/image";

export function PhoneModelCard({
  model,
  innerRef,
}: {
  model: PartialPhoneModel;
  innerRef?: (node?: Element | null | undefined) => void;
}) {
  return (
    <Link href={`/phone_model/${model.slug}`} ref={innerRef}>
      <Card className=" shadow-md transition-all  duration-300 hover:scale-95  hover:shadow-lg hover:bg-foreground/10  p-0 h-full flex flex-col ">
        <CardContent className="p-1 image-safe">
          <Image
            src={model.main_image}
            alt="картинка карточки"
            width={60}
            height={80}
            className="w-[60px] h-20 object-fill mx-auto rounded-md"
            priority={false}
            loading="lazy"
          />
        </CardContent>
        <CardFooter className="flex justify-center p-1">
          <h2 className="text-xs flex text-center items-center justify-center">{model.short_name}</h2>
        </CardFooter>
      </Card>
    </Link>
  );
}
export function PhoneModelCardSkeleton() {
  return (
    <div className="h-full">
      <Card className="shadow-md transition-all duration-300 hover:scale-95 hover:shadow-lg hover:bg-foreground/10 p-0 h-full flex flex-col">
        {/* Image placeholder */}
        <CardContent className="p-1 image-safe">
          <Skeleton className="w-14 h-20 mx-auto rounded-md" style={{ aspectRatio: "100/146.5" }} />
        </CardContent>

        {/* Title placeholder */}
        <CardFooter className="flex justify-center p-1">
          <CardTitle className="text-xs text-center w-full">
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </CardTitle>
        </CardFooter>
      </Card>
    </div>
  );
}
