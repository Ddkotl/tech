"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserEntity } from "../_domain/types";

export const columns: ColumnDef<UserEntity>[] = [
  {
    accessorKey: "image",
    header: "Аватарка",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Роль",
  },
  {
    accessorKey: "name",
    header: "Имя",
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
