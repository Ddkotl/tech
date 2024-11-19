"use client";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@/shared/components";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export function SignInButton() {
  const handleSignOut = () => signIn();

  return (
    <Button
      variant={"outline"}
      onClick={handleSignOut}
      className="group relative"
    >
      <LogIn className="mr-2 h-4 w-4 group-hover:opacity-0 duration-1000 " />
      <span className="group-hover:opacity-0 duration-1000 ">Войти</span>
      <FaArrowRight
        size={20}
        className="absolute right-5 transition duration-1000 -translate-x-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-2"
      />
    </Button>
  );
}
