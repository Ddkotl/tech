import { Badge, Skeleton } from "@/shared/components";
import { PartialTag } from "../_domain/types";
import Link from "next/link";

export function TagBage({ slug, title }: PartialTag): JSX.Element {
  return (
    <Badge
      key={slug}
      className="h-6 bg-fio transition-colors duration-300 hover:scale-95 hover:bg-slate-950 text-slate-100 text-xs font-medium px-2 py-1 z-40"
    >
      <Link href={`/tags/${slug}`}>{title}</Link>
    </Badge>
  );
}

export function TagBageSkeleton() {
  return <Skeleton className="h-6 w-12 sm:w-16 rounded-md" />;
}
