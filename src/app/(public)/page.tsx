import { Metadata } from "next";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Button, Title } from "@/shared/components";
import Link from "next/link";
import { LatestNews } from "@/entities/news/_ui/latest_news";
import { LatestReviews } from "@/entities/reviews/_ui/latest_reviews";
import TechHero from "@/shared/components/custom/tech_hero";

export const metadata: Metadata = generateSEOMetadata({
  title: "Главная",
  description: "Получите последние обзоры смартфонов, новости технологий и советы по выбору современных гаджетов.",
  keywords: ["технологии", "смартфоны", "обзоры", "новости", "гаджеты", "мобильные телефоны", "инновации"],
  ogImage: "/logo_opengraf.jpg",
  canonical: "https://tech24view.ru",
});

export default async function Home() {
  return (
    <main className="flex flex-col flex-1   gap-2 md:gap-4">
      <TechHero />
      <div className="flex flex-row gap-4  justify-between items-center ">
        <Title size="lg" text="Последние новости" />
        <Link href={"/news"}>
          <Button variant="outline">Все новости</Button>
        </Link>
      </div>
      <LatestNews count={20} />
      <div className="flex flex-row gap-4  justify-between items-center ">
        <Title size="lg" text="Популярные обзоры" />
        <Link href={"/reviews"}>
          <Button variant="outline">Все обзоры</Button>
        </Link>
      </div>
      <LatestReviews count={20} />
    </main>
  );
}
