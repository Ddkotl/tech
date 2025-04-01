import { Badge, Skeleton } from "@/shared/components";
import { PartialTag } from "../_domain/types";
import Link from "next/link";

export function TagBage({ slug, title }: PartialTag): JSX.Element {
  return (
    <Badge
      key={slug}
      className="bg-fio transition-colors duration-300 hover:scale-95 hover:bg-slate-950 text-slate-100 text-xs font-medium px-1.5 py-0.5 z-40"
    >
      <Link href={`tags/${slug}`}>{title}</Link>
    </Badge>
  );
}

export function TagBageSkeleton() {
  return <Skeleton className="h-6 w-12 sm:w-16 rounded-full" />;
}
