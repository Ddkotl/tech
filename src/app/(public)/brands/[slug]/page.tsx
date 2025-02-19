import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
} from "@/shared/components";
import { getBrandBySlug } from "@/entities/brands/_actions/get_brand_by_slug";
import { getPhoneModelsByBrandSlug } from "@/entities/phone_models";
import { PhoneModelCard } from "@/entities/phone_models/_ui/phone_model_card";

export default async function ModelsByBrandPage({
  params,
}: {
  params: { slug: string };
}) {
  const [brand, models] = await Promise.all([
    getBrandBySlug(params.slug),
    getPhoneModelsByBrandSlug(params.slug),
  ]);

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
                <PhoneModelCard model={model} key={model.id} />
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
