import { BookmarksTabs } from "@/entities/bookmark/_ui/bookmarks_tabs";
import { Title } from "@/shared/components";

export default async function BookmarksPage() {
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <Title size="xl" text={`Все ваши закладки:`} />
      <BookmarksTabs />
    </main>
  );
}
