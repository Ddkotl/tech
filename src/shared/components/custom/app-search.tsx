"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

export function AppSearch() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function searchAction(formData: FormData) {
    const value = formData.get("q") as string;
    const params = new URLSearchParams({ q: value });
    startTransition(() => {
      router.replace(`/admin/?${params.toString()}`);
    });
  }

  return (
    <form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
      <IoSearch className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="поиск"
        placeholder="Поиск..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
      {isPending && <Spinner />}
    </form>
  );
}
