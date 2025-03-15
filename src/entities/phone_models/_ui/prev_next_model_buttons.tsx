import { NavigationButton } from "@/shared/components/custom/navigation_button";
import { getNextAndPrevModelsInfo } from "../_actions/get_next_prev_model";

export async function NextAndPrevModelButtons({
  currentModelSlug,
  brandId,
}: {
  currentModelSlug: string;
  brandId: string;
}) {
  const data = await getNextAndPrevModelsInfo(currentModelSlug, brandId);

  if (!data) {
    return (
      <div className="text-foreground">
        Не удалось загрузить данные о соседних моделях.
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-2 lg:gap-4">
      {data?.next_slug && (
        <NavigationButton
          slug={data?.next_slug || ""}
          image={data?.next_main_image || ""}
          text={data?.next_full_name || ""}
          direction="next"
          className="mr-auto"
        />
      )}
      {data?.prev_slug && (
        <NavigationButton
          slug={data?.prev_slug || ""}
          image={data?.prev_main_image || ""}
          text={data?.prev_full_name || ""}
          direction="prev"
          className="ml-auto"
        />
      )}
    </div>
  );
}
