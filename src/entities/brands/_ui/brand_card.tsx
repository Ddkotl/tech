import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/shared/components";
import Link from "next/link";
import { getModelDeclension } from "../_fn/get_models_declension";

export function BrandCard({
  brandSlug,
  brandName,
  brandCountPhones,
  innerRef,
}: {
  brandSlug: string;
  brandName: string;
  brandCountPhones: number;
  innerRef?: (node?: Element | null | undefined) => void;
}) {
  return (
    <Link href={`brands/${brandSlug}`} ref={innerRef}>
      <Card className="p-0 h-24  flex flex-col justify-evenly shadow-md transition-all  duration-300 hover:scale-95  hover:shadow-lg hover:bg-foreground/10  items-center">
        <CardHeader className="p-1 sm:p-2 flex items-center justify-center text-center">
          <CardTitle className=" uppercase text-sm sm:text-base ">{brandName}</CardTitle>
        </CardHeader>
        <CardContent className="p-1 sm:p-2">
          <p className="text-sm text-muted-foreground ">
            {brandCountPhones} {getModelDeclension(brandCountPhones)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export function BrandCardSkeleton() {
  return (
    <div>
      <Card className="p-0 h-24 flex flex-col justify-evenly shadow-md transition-all duration-300 hover:scale-95 hover:shadow-lg hover:bg-foreground/10 items-center">
        <CardHeader className="p-1 sm:p-2 flex items-center justify-center text-center w-full">
          <CardTitle className="uppercase text-sm sm:text-base w-full">
            <Skeleton className="h-5 w-3/4 mx-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-1 sm:p-2 w-full">
          <div className="text-sm text-muted-foreground w-full text-center">
            <Skeleton className="h-4 w-16 mx-auto" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
