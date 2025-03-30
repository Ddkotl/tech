import { setupCron } from "@/shared/lib/crone";
import { NextResponse } from "next/server";

export async function GET() {
  setupCron();

  return NextResponse.json({ success: true, message: "Cron процесс запущен" });
}
