"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PostEntity } from "../post";

export const columns: ColumnDef<PostEntity>[] = [
  {
    accessorKey: "title",
    header: "Название",
  },
  {
    accessorKey: "createdAt",
    header: "Создано",
  },
  {
    accessorKey: "updatedAt",
    header: "Изменено",
  },
];
