import { setupCron } from "@/shared/lib/parsing/crone";
import { NextResponse } from "next/server";

let cronInitialized = false;

export async function GET() {
  if (!cronInitialized) {
    setupCron();
    cronInitialized = true; // Убедитесь, что CRON запускается только один раз
  }

  return NextResponse.json({ success: true, message: "Cron процесс запущен" });
}
