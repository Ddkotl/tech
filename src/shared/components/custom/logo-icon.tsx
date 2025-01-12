import Image from "next/image";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      width={50}
      height={50}
      alt="Logo"
      src={"/logo.png"}
      priority
    />
  );
}
