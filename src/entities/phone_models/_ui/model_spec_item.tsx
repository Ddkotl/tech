import { ReactNode } from "react";

export const ModelSpecItem = ({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string | null | undefined;
}) => (
  <div className="flex items-center gap-2 border-b border-foreground/30 py-2">
    <span>{icon}</span>

    <span className="font-medium text-base foreground/70">{title}:</span>
    <span className="text-xs text-foreground/60 ml-auto text-end">
      {value ? value : "-"}
    </span>
  </div>
);
