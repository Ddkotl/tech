import { Metadata } from "next";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Button, Container, ContentContainer } from "@/shared/components";
import Link from "next/link";
import { Sidebar } from "@/widgets/sidebar/app-sidebar";
import { LastModels } from "@/entities/phone_models";
import { LatestNews } from "@/entities/news/_ui/latest_news";

export const metadata: Metadata = generateSEOMetadata({
  title: "Главная",
  description:
    "Получите последние обзоры смартфонов, новости технологий и советы по выбору современных гаджетов.",
  keywords: [
    "технологии",
    "смартфоны",
    "обзоры",
    "новости",
    "гаджеты",
    "мобильные телефоны",
    "инновации",
  ],
  ogImage: "/logo_opengraf.jpg",
  canonical: "https://tech24view.ru",
});

export default async function Home() {
  return (
    <Container className="h-full flex  flex-1  gap-2 lg:gap-6 ">
      <ContentContainer className="flex flex-col  flex-1 gap-2 lg:gap-6 ">
        <section className="flex flex-col   gap-2 md:gap-4">
          <div className="flex flex-row gap-4  justify-between items-center mb-4">
            <h2 className="text-lg md:text-3xl font-bold ml-6">
              Последние новости
            </h2>
            <Button
              variant="outline"
              className="mr-6 flex items-center justify-center"
            >
              <Link href={"/news"}>Все новости</Link>
            </Button>
          </div>
          <LatestNews count={20} />
        </section>
      </ContentContainer>
      <Sidebar children1={<LastModels />} />
    </Container>
  );
}
