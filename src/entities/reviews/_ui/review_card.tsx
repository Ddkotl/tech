import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  TimeAgo,
} from "@/shared/components";
import { TagBage } from "@/entities/tag";
import { PartialNewsWithTags } from "@/entities/news/_domain/types";

export default function ReviewCard({
  review,
}: {
  review: PartialNewsWithTags;
}) {
  return (
    <Card className="max-w-[350px]   transition-all hover:bg-background/80">
      <div className="flex flex-col  gap-1 sm:gap-2  justify-center items-center">
        {/* Image container with fixed aspect ratio */}
        <div className="relative  aspect-[343/214] overflow-hidden max-w-[350px] h-full flex-grow flex-shrink-0 image-safe ">
          <Image
            src={review.previewImage || "/placeholder.png"}
            alt={review.title}
            width={343}
            height={214}
            sizes="(max-width: 640px) 100vw, 350px"
            className="  object-cover rounded-md"
            priority
          />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {review?.tags.map((tag) => (
              <TagBage key={tag.slug} slug={tag.slug} title={tag.title} />
            ))}
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col justify-between p-2 sm:pt-1 sm:p-4 ">
          <div>
            <Link href={`/reviews/${review.slug}`} className="group">
              <CardTitle className="text-base font-semibold line-clamp-2 group-hover:text-foreground/60 duration-300 transition-colors">
                {review.title}
              </CardTitle>
            </Link>

            <CardDescription className="text-xs mt-1.5">
              <TimeAgo date={review.createdAt} />
            </CardDescription>

            <p className="text-sm line-clamp-3 mt-2 text-muted-foreground">
              {review.meta_description}
            </p>
          </div>

          <div className=" pt-2">
            <Link href={`/reviews/${review.slug}`}>
              <Button
                size="sm"
                className="text-xs bg-foreground text-background hover:bg-foreground/60  transition-colors duration-300 "
              >
                Читать дальше
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
