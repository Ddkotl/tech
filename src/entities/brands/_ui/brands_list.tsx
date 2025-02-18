import { Prisma } from "@prisma/client";
import { BrandCard } from "./brand_card";

export function BrandList({
  brands,
}: {
  brands: Prisma.BrandsGetPayload<{
    include: {
      _count: { select: { phones: true } };
    };
  }>[];
}) {
  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 md:gap-4 auto-rows-fr">
      {brands?.map((brand) => (
        <BrandCard
          key={brand.id}
          brandSlug={brand.slug}
          brandName={brand.name}
          brandCountPhones={brand._count.phones}
        />
      ))}
    </div>
  );
}
