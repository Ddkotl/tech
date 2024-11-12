import { LogoIcon } from "@/shared/components/ui";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="flex items-center space-x-2" href="/">
      <LogoIcon className="h-10 w-10" />
      <span className="font-bold inline-block">Tech</span>
    </Link>
  );
}
