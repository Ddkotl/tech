"use client";

import {
  AdminIcon,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@/shared/components";
import { getProfileDisplayName, ProfileAvatar } from "@/entities/user/profile";
import { useAppSession } from "@/entities/user/session";
import { SignInButton } from "@/features/auth/sign-in-button";
import { useSignOut } from "@/features/auth/use-sign-out";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { ROLES } from "@/entities/user";

export function Profile() {
  const session = useAppSession();
  const role = session.data?.user.role;

  const { signOut, isPending } = useSignOut();
  if (session.status === "loading") {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }
  if (session.status === "unauthenticated") {
    return <SignInButton />;
  }
  const user = session?.data?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-px rounded-full self-center h-8 w-8" name="профиль" aria-label="профиль">
          <ProfileAvatar className="h-8 w-8" profile={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 ">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            {user ? getProfileDisplayName(user) : undefined}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${user?.id}`}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
          {role === ROLES.ADMIN && (
            <DropdownMenuItem asChild>
              <Link href="/admin" aria-label="админка">
                <AdminIcon className="mr-2 h-4 w-4" />
                <span>Админка</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem disabled={isPending} onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
