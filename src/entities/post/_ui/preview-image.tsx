import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components";
import { cn } from "@/shared/lib/utils";

export const PreviewImage = ({
  path,
  className,
}: {
  path?: string;
  className?: string;
}) => {
  if (!path) {
    return null;
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={path ?? ""} className="object-cover" />
      <AvatarFallback>IMG</AvatarFallback>
    </Avatar>
  );
};
