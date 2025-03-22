import { getTagsCount } from "@/entities/tag";
import { TagsList } from "@/entities/tag/_ui/tags_list";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
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
  const tagsCount = await getTagsCount();
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <h1 className="text-base lg:text-xl w-full gap-4 text-center md:text-start">Тэги новостей и обзоров</h1>
          {/* <TagsSearch /> */}
        </div>
        <TagsList tagsCount={tagsCount} />
      </div>
    </main>
  );
}
