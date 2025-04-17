import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Сравнение моделей",
    description: "Сравнение моделей смартфонов",
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
    canonical: "https://tech24view.ru/compare",
  });
}
export default async function ComparePage() {
  return (
    <div>
      <h1>Compare Page</h1>
    </div>
  );
}
