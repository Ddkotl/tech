import { TagsList } from "@/entities/tag/_ui/tags_list";
import { TagsSearch } from "@/entities/tag/_ui/tags_search";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Тэги",
    description: "Список тэгов для поиска новостей и обзоров",
    keywords: [
      "тэги",
      "брэнды смартфонов",
      "технологии",
      "смартфоны",
      "обзоры",
      "новости",
      "новости смартфонов",
      "гаджеты",
      "мобильные телефоны",
      "инновации",
    ],
    ogImage: "/logo_opengraf.jpg",
    canonical: "https://tech24view.ru/tags",
  });
}

export default async function TagsPage() {
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <Title size="xl" text="Тэги новостей и обзоров" />
          <TagsSearch />
        </div>
        <TagsList />
      </div>
    </main>
  );
}
