import cron from "node-cron";
import { StartParse } from "./parsing";
import { createBackup } from "./backups/db/db_backup";
import { createMinioBackup } from "./backups/s3/s3_backup";
import { cleanupOldDBBackups } from "./backups/db/db_cleen";
import { cleanupOldMinioBackups } from "./backups/s3/s3_cleen";

export function setupCron() {
  console.log("⏳ Cron задачи инициализированы...");

  cron.schedule(
    "0 0 29 1 *",
    async () => {
      console.log("🚀 Запуск парсинга...");
      try {
        await StartParse();
        console.log("✅ Парсинг успешно завершён.");
      } catch (error) {
        console.error("❌ Ошибка при выполнении парсинга:", error);
      }
    },
    { scheduled: true },
  );

  cron.schedule(
    "0 0 3 * *",
    async () => {
      console.log("📀 Запуск создания бэкапа...");
      try {
        await createBackup();
        await createMinioBackup();
        await cleanupOldDBBackups();
        await cleanupOldMinioBackups();
        console.log("✅ Бэкап успешно завершён.");
      } catch (error) {
        console.error("❌ Ошибка при создании бэкапа:", error);
      }
    },
    { scheduled: true },
  );
}
