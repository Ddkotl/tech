import parse from "html-react-parser";

import { getPhoneModelInfo } from "@/entities/phone_models/_actions/get_model_info_by_slug";
import { PhoneModeLFullInfo } from "@/entities/phone_models";
import { PhoneModelLargeCard } from "@/entities/phone_models/_ui/phone_model_large_card";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { NextAndPrevModelButtons } from "@/entities/phone_models/_ui/prev_next_model_buttons";
import { DeleteModelButton } from "@/entities/phone_models/_ui/delete_model_button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pageParams = await params;
  const phone: PhoneModeLFullInfo | null = await getPhoneModelInfo(pageParams.slug);

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

export default async function PhoneModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const phone: PhoneModeLFullInfo | null = await getPhoneModelInfo(pageParams.slug);
  if (!phone) {
    return <div className="text-center py-10 text-foreground">Не удалось получить информацию о модели</div>;
  }

  return (
    <main className="flex flex-col  flex-1 gap-2 lg:gap-6 ">
      {/* Карточка телефона */}
      <DeleteModelButton slug={pageParams.slug} />
      <PhoneModelLargeCard phone={phone} />

      {/* Раздел "Описание" */}
      <div className=" p-4 rounded-xl border bg-card text-card-foreground shadow-lg text-safe">
        <h2 className="text-2xl lg:text-3xl font-semibold ">Подробные характеристики</h2>
        <div className="prose ">
          {phone.specifications[0].description
            ? parse(String(phone.specifications[0].description))
            : "Описание отсутствует"}
        </div>
      </div>
      <NextAndPrevModelButtons currentModelSlug={pageParams.slug} brandId={phone.brandId} />
    </main>
  );
}
