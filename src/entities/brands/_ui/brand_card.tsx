import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components";
import Link from "next/link";
import { getModelDeclension } from "../_fn/get_models_declension";

export function BrandCard({
  brandSlug,
  brandName,
  brandCountPhones,
}: {
  brandSlug: string;
  brandName: string;
  brandCountPhones: number;
}) {
  return (
    <Link href={`brands/${brandSlug}`}>
      <Card className="p-0 h-24  flex flex-col justify-evenly shadow-md transition-all  duration-300 hover:scale-105  hover:shadow-lg hover:bg-foreground/10  items-center">
        <CardHeader className="p-1 sm:p-2 flex items-center justify-center text-center">
          <CardTitle className=" uppercase text-sm sm:text-base ">
            {brandName}
          </CardTitle>
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
