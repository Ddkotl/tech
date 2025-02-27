import { PartialReviewsWithTags } from "../_domain/types";
import ReviewCard from "./review_card";

export function ReviewsList({
  reviews,
}: {
  reviews: PartialReviewsWithTags[];
}) {
  return (
    <div className=" flex flex-col gap-2 lg:gap-4 ">
      {reviews?.map((review) => <ReviewCard key={review.id} review={review} />)}
    </div>
  );
}
