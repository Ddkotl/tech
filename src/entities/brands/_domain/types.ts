import { Brands } from "@prisma/client";

export type BrandWithModelsCount = Brands & {
  _count: {
    phones: number;
  };
};
export type PartialBrandsBySitemap = Pick<Brands, "createdAt" | "slug">;
