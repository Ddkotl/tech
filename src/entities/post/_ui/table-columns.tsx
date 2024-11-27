"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PostEntity } from "..";
import { GetTimeFromNow } from "@/shared/lib/dataTime/get-time-from-now";
import { PreviewImage } from "./preview-image";

export const columns: ColumnDef<PostEntity>[] = [
  {
    accessorKey: "previewImage",
    header: () => <div className="text-right">Превью</div>,
    cell: ({ row }) => {
      const data: string = row.getValue("previewImage");
      return <PreviewImage path={data} />;
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-right">Название</div>,
    cell: ({ row }) => {
      const data: string = row.getValue("title");
      return (
        <div className="text-left font-medium overflow-hidden max-w-40">
          {data}
        </div>
      );
    },
  },
  {
    accessorKey: "published",
    header: () => <div className="text-center">Статус</div>,
    cell: ({ row }) => {
      const data: boolean = row.getValue("published");
      if (data) {
        return <div className="text-center font-medium">Опубликовано</div>;
      } else {
        return <div className="text-center font-medium">Черновик</div>;
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Создано</div>,
    cell: ({ row }) => {
      const data = GetTimeFromNow(row.getValue("createdAt"));
      return <div className="text-center font-medium">{data}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-center">Изменено</div>,
    cell: ({ row }) => {
      const data = GetTimeFromNow(row.getValue("updatedAt"));
      return <div className="text-center font-medium">{data}</div>;
    },
  },
];
