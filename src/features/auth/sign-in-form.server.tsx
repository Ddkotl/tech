import { ProviderButton } from "./_ui/provider-button";
import { cn } from "@/lib/utils";

export function SignInForm({ className }: { className?: string }) {
  const oauthProviders = [
    { id: "github", name: "Github" },
    { id: "google", name: "Google" },
    { id: "yandex", name: "Yandex" },
  ];

  return (
    <div className={cn("grid gap-4", className)}>
      {oauthProviders.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
