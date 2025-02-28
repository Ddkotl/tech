import { Badge } from "@/shared/components";
import { PartialTag } from "../_domain/types";

export function TagBage({ slug, title }: PartialTag): JSX.Element {
  return (
    <Badge
      key={slug}
      className="bg-fio transition-colors duration-300 hover:bg-slate-950 text-slate-100 text-xs font-medium px-1.5 py-0.5 z-40"
    >
      {title}
    </Badge>
  );
}
