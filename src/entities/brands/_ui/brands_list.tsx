import { BrandCard } from "./brand_card";
import { BrandWithModelsCount } from "../_domain/types";

export function BrandList({ brands }: { brands: BrandWithModelsCount[] }) {
  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 md:gap-3 auto-rows-fr">
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
