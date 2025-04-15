"use client";
import { useDispatch } from "react-redux";
import { Button } from "@/shared/components";
import { clearNewsBookmarks } from "../slices/news_bookmarks_slice";
import { useMutation } from "@tanstack/react-query";
import { deleteAllNewsBookmarksByUser } from "@/entities/bookmark/_actions/delete_news_bookmarks";
import { useAppSession } from "@/entities/user/session";
import { toast } from "sonner";

export function CleareBookmarksButton() {
  const dispatch = useDispatch();
  const session = useAppSession();
  const userId = session?.data?.user.id;
  const deleteServerNewsBookmarks = useMutation({
    mutationFn: async (userId: string) => {
      return await deleteAllNewsBookmarksByUser(userId);
    },
    onSuccess: () => {
      toast("Закладки очищены", {
        description: "Все закладки удалены",
        duration: 3000,
      });
    },
    onError: () => {
      toast("Ошибка", {
        description: "Не удалось очистить закладки",
        duration: 3000,
      });
    },
  });
  const handleClearBookmarks = () => {
    dispatch(clearNewsBookmarks());
    if (userId) {
      deleteServerNewsBookmarks.mutate(userId);
    }
  };

  return (
    <Button
      variant="destructive"
      size="lg"
      name="очистить закладки"
      aria-label="очистить закладки"
      onClick={handleClearBookmarks}
      disabled={deleteServerNewsBookmarks.isPending}
    >
      Очистить закладки
    </Button>
  );
}
