import { Separator } from "@/shared/components";
import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const pageParams = await params;
  return (
    <main className="space-y-6 py-12 px-6 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Профиль</h3>
        <p className="text-sm text-muted-foreground">Это как другие пользователи видят вас на сайте</p>
      </div>
      <Separator />
      <UpdateProfileForm userId={pageParams.id} />
    </main>
  );
}
