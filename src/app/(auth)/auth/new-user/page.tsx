import { Separator } from "@/shared/components/ui";
import { getAppSessionServer } from "@/entities/user/get-app-session.server";
import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";
import { redirect } from "next/navigation";
import AuthorizedGuard from "@/features/auth/authorized-guard";

export default async function NewUserPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await getAppSessionServer();

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <AuthorizedGuard>
      <main className="space-y-6 py-14 container  max-w-[600px]">
        <div>
          <h3 className="text-lg font-medium">Последний шаг</h3>
          <p className="text-sm text-muted-foreground">
            Обновите профиль, это как другие пользователи увидят вас на сайте
          </p>
        </div>
        <Separator />
        <UpdateProfileForm
          userId={session.user.id}
          callbackUrl={searchParams.callbackUrl}
        />
      </main>
    </AuthorizedGuard>
  );
}
