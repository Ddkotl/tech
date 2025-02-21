import parse from "html-react-parser";

import styles from "./content.module.css";
import { getPhoneModelInfo } from "@/entities/phone_models/_actions/get_model_info_by_slug";
import {
  getPhoneModeBySlug,
  PartialPhoneModel,
  PhoneModeLFullInfo,
} from "@/entities/phone_models";
import { PhoneModelLargeCard } from "@/entities/phone_models/_ui/phone_model_large_card";
import { Container } from "@/shared/components";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const phone: PartialPhoneModel | null = await getPhoneModeBySlug(params.slug);

  return generateSEOMetadata({
    title: phone?.full_name ? phone?.full_name : "",
    description: `Характеристики и описание модели: ${phone?.full_name}`,
    keywords: [
      `${phone?.full_name}`,
      `${phone?.short_name}`,
      `Характеристики ${phone?.full_name}`,
      `Описание ${phone?.full_name}`,
      "брэнды",
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
    ogImage: `${phone?.main_image}`,
    canonical: `https://tech24view.ru/phone_model/${phone?.slug}`,
  });
}

export default async function PhoneModelPage({
  params,
}: {
  params: { slug: string };
}) {
  const phone: PhoneModeLFullInfo | null = await getPhoneModelInfo(params.slug);
  if (!phone) {
    return (
      <div className="text-center py-10 text-foreground">
        Не удалось получить информацию о модели
      </div>
    );
  }

  return (
    <Container>
      {/* Карточка телефона */}
      <PhoneModelLargeCard phone={phone} />

      {/* Раздел "Описание" */}
      <div className="mt-6 p-4 rounded-xl border bg-card text-card-foreground shadow">
        <h2 className="text-xl font-semibold mb-3">Описание</h2>
        <div className={styles.prose}>
          {phone.specifications[0].description
            ? parse(String(phone.specifications[0].description))
            : "Описание отсутствует"}
        </div>
      </div>
    </Container>
  );
}
