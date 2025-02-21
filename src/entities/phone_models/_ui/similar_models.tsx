import React from "react";
import { getSimilarModels } from "../_actions/get_similar_models";
import { PhoneModelLitleCard } from "./phone_litle_card";

export const SimilarModels = async ({ brandId }: { brandId: string }) => {
  const similarModels = await getSimilarModels(brandId);
  if (!similarModels || similarModels.length === 0) {
    return <p>Нет похожих моделей</p>;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold">{`Последние модели ${similarModels[0].brand?.name.toUpperCase()}`}</h3>
      <ul className="flex flex-col gap-1">
        {similarModels.map((model) => (
          <PhoneModelLitleCard key={model.id} model={model} />
        ))}
      </ul>
    </div>
  );
};
