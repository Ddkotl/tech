import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
} from "@/shared/components";
import { dataBase } from "@/shared/lib/db_conect";
import { Prisma } from "@prisma/client";
import Link from "next/link";

const getBrandsList = async (): Promise<
  | Prisma.BrandsGetPayload<{
      include: {
        _count: { select: { phones: true } };
      };
    }>[]
  | undefined
> => {
  try {
    const brands = await dataBase.brands.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: { select: { phones: true } },
      },
    });
    return brands;
  } catch (error) {
    console.log(error);
  }
};

const getModelDeclension = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) return "модель";
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  )
    return "модели";
  return "моделей";
};

export default async function BrandsPage() {
  const brands = await getBrandsList();
  return (
    <Container>
      <div className=" grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 md:gap-4 auto-rows-fr">
        {brands?.map((brand) => (
          <Link key={brand.id} href={`brands/${brand.slug}`}>
            <Card className="p-0 shadow-md transition-all  duration-300 hover:scale-105  hover:shadow-lg hover:bg-foreground/10 flex flex-col items-center">
              <CardHeader className="p-1 sm:p-2">
                <CardTitle className="first-letter:uppercase">
                  {brand.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1 sm:p-2">
                <p className="text-sm text-muted-foreground ">
                  {brand._count.phones}{" "}
                  {getModelDeclension(brand._count.phones)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>{" "}
    </Container>
  );
}
