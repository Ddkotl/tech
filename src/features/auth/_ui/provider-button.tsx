"use client";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaYandex } from "react-icons/fa";
import { useOAuthSignIn } from "../_vm/use-oauth-sign-in";
import { Button, Spinner } from "@/components/ui";

interface ProviderButtonProps {
  id: string;
  name: string;
}

export function ProviderButton({
  provider,
}: {
  provider: ProviderButtonProps;
}) {
  const oauthSignIn = useOAuthSignIn(provider.id);

  const getIcon = (providerId: string) => {
    switch (providerId) {
      case "github":
        return <FaGithub className="mr-2 h-4 w-4" />;
      case "google":
        return <FaGoogle className="mr-2 h-4 w-4" />;
      case "yandex":
        return <FaYandex className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={oauthSignIn.isPending}
      onClick={() => oauthSignIn.signIn()}
    >
      {oauthSignIn.isPending ? (
        <Spinner className="mr-2 h-4 w-4 animate-spin" aria-label="Вход" />
      ) : (
        getIcon(provider.id)
      )}
      {provider.name}
    </Button>
  );
}
