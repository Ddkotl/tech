"use client";

import { useAppSession } from "@/entities/user/session";
import { FaRegBookmark } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../ui/button";

export function BookmarksIcon() {
  const session = useAppSession();

  const user = session?.data?.user;
  return (
    <Link href={`/bookmarks/${user?.id}`}>
      <Button variant="ghost" size="icon" name="закладки" aria-label="закладки">
        <FaRegBookmark className=" text-fio h-4 w-4" />
      </Button>
    </Link>
  );
}
