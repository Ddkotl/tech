import { Tag } from "@prisma/client";
import { dataBase } from "../../db_conect";

export const isTagExist = async (slug: string): Promise<Tag | null> => {
  const tag = await dataBase.tag.findFirst({
    where: {
      slug: slug,
    },
  });
  return tag;
};
