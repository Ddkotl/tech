import { Brands } from "@prisma/client";

export type BrandWithModelsCount = Brands & {
  _count: {
    phones: number;
  };
};
