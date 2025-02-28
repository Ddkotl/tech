import parse from "html-react-parser";

import { LastModels } from "@/entities/phone_models";
import { Container, ContentContainer } from "@/shared/components";
import { Sidebar } from "@/widgets/sidebar/app-sidebar";
import { getReviewsFullInfoBySlug } from "@/entities/reviews/_actions/get_review_full_info_by_slug";
import { ReviewFullInfo } from "@/entities/reviews";
import { PhoneModelCard } from "@/entities/phone_models/_ui/phone_model_card";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const phone: PartialPhoneModel | null = await getPhoneModeBySlug(params.slug);

//   return generateSEOMetadata({
//     title: phone?.full_name ? phone?.full_name : "",
//     description: `Характеристики и описание модели: ${phone?.full_name}`,
//     keywords: [
//       `${phone?.full_name}`,
//       `${phone?.short_name}`,
//       `Характеристики ${phone?.full_name}`,
//       `Описание ${phone?.full_name}`,
//       "брэнды",
//       "брэнды смартфонов",
//       "технологии",
//       "смартфоны",
//       "обзоры",
//       "новости",
//       "новости смартфонов",
//       "гаджеты",
//       "мобильные телефоны",
//       "инновации",
//     ],
//     ogImage: `${phone?.main_image}`,
//     canonical: `https://tech24view.ru/phone_model/${phone?.slug}`,
//   });
// }

export default async function ReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const review: ReviewFullInfo | null = await getReviewsFullInfoBySlug(
    params.slug,
  );
  if (!review) {
    return (
      <div className="text-center py-10 text-foreground">
        Не удалось получить информацию о обзоре
      </div>
    );
  }

  return (
    <Container className="flex gap-2  flex-1 lg:gap-6 ">
      <ContentContainer className="flex flex-col  flex-1 gap-2 lg:gap-6 ">
        <div className=" p-4 rounded-xl border bg-card text-card-foreground shadow-lg text-safe">
          <h1 className="text-base font-bold lg:text-xl w-full gap-4 text-center md:text-start">
            {review.title}
          </h1>
          {review.phoneModel ? (
            <PhoneModelCard model={review.phoneModel} />
          ) : (
            ""
          )}
          <div className="prose ">
            {review.content
              ? parse(String(review.content))
              : "Обзор отсутствует"}
          </div>
        </div>
        {/* <NextAndPrevButtons
          currentModelSlug={params.slug}
          brandId={review.brandId}
        /> */}
      </ContentContainer>
      <Sidebar children2={<LastModels />} />
    </Container>
  );
}
