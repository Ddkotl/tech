import parse from "html-react-parser";

import styles from "./content.module.css";
import { getPhoneModelInfo } from "@/entities/phone_models/_actions/get_model_by_slug";
import { PhoneModeLFullInfo } from "@/entities/phone_models";
import { PhoneModelLargeCard } from "@/entities/phone_models/_ui/phone_model_large_card";
import { Container } from "@/shared/components";

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
