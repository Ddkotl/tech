import { Tag } from "@prisma/client";

export type PartialTag = Pick<Tag, "slug" | "title">;
