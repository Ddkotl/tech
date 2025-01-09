import Image from "next/image";
import Link from "next/link";
import { News, Tag } from "@prisma/client";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/shared/components";

// Define the NewsWithTags type
type NewsWithTags = News & {
  tags: Tag[];
};

export default function NewsCard({ news }: { news: NewsWithTags }) {
  return (
    <Card className="rounded-lg shadow-md border bg-background/50">
      {/* Render preview image if available */}
      {news.previewImage && (
        <div className="relative w-full h-48">
          <Image
            src={news.previewImage}
            alt={news.title}
            layout="fill"
            className="rounded-t-lg object-scale-down sm:object-cover "
          />
        </div>
      )}
      <CardContent className="p-4">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl font-semibold">
            <Link href={`/news/${news.slug}`} className="hover:text-blue-600">
              {news.title}
            </Link>
          </CardTitle>
          <CardDescription className="text-foreground/50">
            {news.meta_description}
          </CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          {/* Render tags */}
          <div className="flex space-x-2">
            {news.tags.map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-sm">
                {tag.title}
              </Badge>
            ))}
          </div>
          {/* Render views count */}
          <span className="text-sm text-gray-500">
            Просмотров: {news.views}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
