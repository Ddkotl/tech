import { dataBase } from "@/shared/lib/db_conect";
import { Brands } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
} from "@/shared/components";
import Image from "next/image";
import Link from "next/link";

// Получение бренда по slug
const getBrandBySlug = async (slug: string): Promise<Brands | null> => {
  try {
    return await dataBase.brands.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
};

// Получение моделей телефонов для бренда
const getPhoneModelsByBrandLittle = async (brandSlug: string) => {
  try {
    return await dataBase.phoneModels.findMany({
      where: { brand: { slug: brandSlug } },
      orderBy: { createdAt: "desc" },
      select: { id: true, short_name: true, main_image: true },
    });
  } catch (error) {
    console.error("Error fetching phone models:", error);
    return [];
  }
};

export default async function ModelsByBrandPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!params?.slug) {
    console.error("Slug is missing");
    return (
      <div className="text-red-500 text-center">Error: Slug is required</div>
    );
  }

  // Параллельные запросы
  const [brand, models] = await Promise.all([
    getBrandBySlug(params.slug),
    getPhoneModelsByBrandLittle(params.slug),
  ]);

  // Если бренд не найден
  if (!brand) {
    return (
      <div className="text-center text-foreground text-xl mt-10">
        Бренд не найден 😢
      </div>
    );
  }

  return (
    <Container>
      <Card className="p-0 justify-between ">
        <CardHeader className="p-1 md:p-2">
          <CardTitle className="text-2xl font-bold">
            {brand.name.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-1 md:p-2">
          {models.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 md:gap-4 auto-rows-fr">
              {models.map((model) => (
                <Link key={model.id} href={`/phone_model/${model.id}`}>
                  <Card className="shadow-md transition-all  duration-300 hover:scale-105  hover:shadow-lg hover:bg-foreground/10  p-0 h-full flex flex-col ">
                    <CardContent className="p-1 md:p-2">
                      <Image
                        src={model.main_image}
                        alt={model.short_name}
                        width={100} // Физический размер картинки
                        height={146.5}
                        className="w-14 h-20 object-fill mx-auto rounded-md" // Задаем фиксированные размеры
                        priority
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                      />
                    </CardContent>
                    <CardFooter className="flex justify-center p-1 md:p-2">
                      <CardTitle className="text-xs flex items-center justify-center">
                        {model.short_name}
                      </CardTitle>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-foreground">Модели не найдены 😔</p>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
