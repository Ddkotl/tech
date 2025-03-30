import { getAppSessionServer } from "@/entities/user/get-app-session.server";
import { redirect } from "next/navigation";

export default async function BookmarksPage({ params }: { params: { id: string } }) {
  const pageParams = await params;
  const session = await getAppSessionServer();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <div>{pageParams.id}</div>;
}
