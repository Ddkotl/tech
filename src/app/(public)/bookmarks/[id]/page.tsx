import AuthorizedGuard from "@/features/auth/authorized-guard";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components";
import { Metadata } from "next";
export const metadata: Metadata = generateSEOMetadata({
  title: "Закладки",
  description: "Серверные закладки пользователя",
});
export default async function UserBookmarksPage({ params }: { params: Promise<{ id: string }> }) {
  const pageParams = await params;
  return (
    <AuthorizedGuard>
      <main className="flex flex-col flex-1    gap-2 md:gap-4">
        <Title size="xl" text={`Все ваши закладки: ${pageParams.id}`} />
      </main>
    </AuthorizedGuard>
  );
}
