import { PhoneModelCard } from "./phone_model_card";
import { PartialPhoneModel } from "../_domain/types";

export function PhoneModelsList({
  models,
}: {
  models: PartialPhoneModel[] | [];
}) {
  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 md:gap-4 auto-rows-fr">
      {models && models.length > 0 ? (
        models?.map((model) => <PhoneModelCard key={model.id} model={model} />)
      ) : (
        <p className="text-center text-foreground">Нет доступных моделей</p>
      )}
    </div>
  );
}
