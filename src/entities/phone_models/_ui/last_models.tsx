import React from "react";
import { PhoneModelLitleCard } from "./phone_litle_card";
import { getLastModels } from "../_actions/get_last_models";

export const LastModels = async () => {
  const similarModels = await getLastModels();
  if (!similarModels || similarModels.length === 0) {
    return <p>Нет моделей</p>;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xs lg:text-base font-semibold">{`Последние модели на сайте`}</h3>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1 lg:gap-2">
        {similarModels.map((model) => (
          <PhoneModelLitleCard key={model.id} model={model} />
        ))}
      </ul>
    </div>
  );
};
