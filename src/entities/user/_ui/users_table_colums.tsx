"use client";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: "Аватар",
  },
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "email",
    header: "Почта",
  },
  {
    accessorKey: "createdAt",
    header: "Зарегистрирован",
  },
  {
    accessorKey: "role",
    header: "Роль",
  },
];
