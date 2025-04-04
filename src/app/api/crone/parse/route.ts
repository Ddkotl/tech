import { setupCron } from "@/shared/lib/cron";
import { NextResponse } from "next/server";

export async function GET() {
  setupCron();

  return NextResponse.json({ success: true, message: "Cron процесс запущен" });
}
