import { getAppSessionServer } from "@/entities/user/get-app-session.server";
import { redirect } from "next/navigation";

export default async function BookmarksPage() {
  const session = await getAppSessionServer();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <div>Bookmarcks</div>;
}
