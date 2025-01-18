import { Card, CardContent } from "@/shared/components";
import Image from "next/image";

interface NewsCardProps {
  title: string;
  previewImage: string | null;
}

export function MiniNewsCard({ title, previewImage }: NewsCardProps) {
  return (
    <Card className="w-[200px] flex-shrink-0">
      <CardContent className="p-2">
        <div className="aspect-[4/3] relative mb-2">
          <Image
            src={previewImage || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover rounded-sm"
          />
        </div>
        <h3 className="text-sm font-medium line-clamp-2 mb-2">{title}</h3>
      </CardContent>
    </Card>
  );
}
