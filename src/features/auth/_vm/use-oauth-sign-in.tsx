import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export function useOAuthSignIn(providerId: string) {
  const oauthSignInMutation = useMutation({
    mutationFn: () => signIn(providerId),
  });

  return {
    isPending: oauthSignInMutation.isPending,
    signIn: oauthSignInMutation.mutate,
  };
}
