import Link from "next/link";

import { Tag } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components";

interface PopularTagsProps {
  tags: Tag[];
}

export default function PopularTags({ tags }: PopularTagsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {tag.title}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
