import { PartialNewsWithTags } from "../_domain/types";
import NewsCardForList from "./news_card_for_list";

export function NewsList({ news }: { news: PartialNewsWithTags[] }) {
  return (
    <div className=" grid grid-cols-1 xs1:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 justify-items-center ">
      {news?.map((SingleNew) => (
        <NewsCardForList key={SingleNew.id} SingleNew={SingleNew} />
      ))}
    </div>
  );
}
