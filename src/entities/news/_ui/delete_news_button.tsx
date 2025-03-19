"use client";

import { useAppSession } from "@/entities/user/session";
import { Button } from "@/shared/components";
import { deleteNewsBySlug } from "../_actons/delete_news_by_slug";
import { useRouter } from "next/navigation";

export const DeleteNewsButton = ({ slug }: { slug: string }) => {
  const session = useAppSession();
  const router = useRouter();
  if (!session) {
    return null;
  }
  if (session.data?.user.role !== "ADMIN") {
    return null;
  }

  const handleDelete = async () => {
    await deleteNewsBySlug(slug);
    router.push("/news");
  };
  return (
    <Button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">
      Delete Current News
    </Button>
  );
};
