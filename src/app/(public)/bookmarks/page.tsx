import { BookmarksTabs } from "@/entities/bookmark/_ui/bookmarks_tabs";
import { getAppSessionServer } from "@/entities/user/get-app-session.server";
import { CleareBookmarksButton } from "@/features/bookmarks/_ui/clear_bookmark_button";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = generateSEOMetadata({
  title: "Закладки",
  description: "Локальные закладки пользователя",
});
export default async function BookmarksPage() {
  const session = await getAppSessionServer();
  const userId = session?.user.id;
  if (userId) {
    return redirect(`/bookmarks/${userId}`);
  }
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex flex-row justify-between items-center">
        <Title size="xl" text={`Все ваши закладки:`} />
        <CleareBookmarksButton />
      </div>

      <BookmarksTabs />
    </main>
  );
}
