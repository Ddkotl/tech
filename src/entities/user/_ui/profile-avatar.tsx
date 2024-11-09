import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Profile } from "../_domain/types";
import { cn } from "@/lib/utils";
import { getProfileLetters } from "../_vm/get-profile-letters";

export const ProfileAvatar = ({
  profile,
  className,
}: {
  profile?: Profile;
  className?: string;
}) => {
  if (!profile) {
    return null;
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={profile.image ?? ""} />
      <AvatarFallback>{getProfileLetters(profile)}</AvatarFallback>
    </Avatar>
  );
};
