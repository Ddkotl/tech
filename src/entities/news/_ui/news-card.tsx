import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/shared/components";
import { NewsWithTags } from "../_domain/types";

export default function NewsCard({ news }: { news: NewsWithTags }) {
  return (
    <Card className="flex flex-col rounded-lg shadow-md  border bg-background/50 h-[500px] ">
      {/* Render preview image if available */}
      {news.previewImage && (
        <div className="relative  w-full h-40 ">
          <Image
            src={news.previewImage}
            alt={news.title}
            fill
            className="rounded-lg object-contain  "
          />
        </div>
      )}
      <CardContent className="p-2 flex justify-between flex-col flex-auto">
        <CardHeader className="space-y-2 p-2">
          <CardTitle className="text-xl font-semibold  line-clamp-2">
            <Link href={`/news/${news.slug}`} className="hover:text-blue-600">
              {news.title}
            </Link>
          </CardTitle>
          <CardDescription className="text-foreground/50 line-clamp-6 h-[120px]">
            {news.meta_description}
          </CardDescription>
          <Separator className="my-2" />
        </CardHeader>
        <div className="flex flex-col gap-8 justify-between items-center">
          {/* Render tags */}
          <div className="flex flex-wrap items-center justify-center gap-1 h-[60px] overflow-hidden ">
            {news.tags.map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-sm h-7">
                {tag.title}
              </Badge>
            ))}
          </div>
          {/* Render views count */}
          <span className="text-sm text-foreground/50">
            Просмотров: {news.views}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
