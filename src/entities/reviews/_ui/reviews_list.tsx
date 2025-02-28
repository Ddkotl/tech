import { PartialReviewsWithTags } from "../_domain/types";
import ReviewCard from "./review_card";

export function ReviewsList({
  reviews,
}: {
  reviews: PartialReviewsWithTags[];
}) {
  return (
    <div className=" grid grid-cols-1 xs1:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 justify-items-center ">
      {reviews?.map((review) => <ReviewCard key={review.id} review={review} />)}
    </div>
  );
}
