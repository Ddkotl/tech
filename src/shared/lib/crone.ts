// src/lib/setupCron.ts
import cron from "node-cron";
import { StartParse } from "./parsing";
import { createBackup } from "./backups/db/db_backup";
import { cleanupOldDBBackups } from "./backups/db/db_cleen";
import { createMinioBackup } from "./backups/s3/s3_backup";
import { cleanupOldMinioBackups } from "./backups/s3/s3_cleen";

// * * * * *
// - - - - -
// | | | | |
// | | | | +--- день недели (0 - 6) (воскресенье = 0)
// | | | +----- месяц (1 - 12)
// | | +------- день месяца (1 - 31)
// | +--------- час (0 - 23)
// +----------- минута (0 - 59)
// * * * * * — выполнение задачи каждую минуту.
// 0 * * * * — выполнение задачи каждый час в 0 минут.
// */5 * * * * — выполнение задачи каждые 5 минут.
// * * 1 * * — выполнение задачи каждый день 1-го числа месяца
export const setupCron = () => {
  // Запуск задачи каждые 6 часов
  cron.schedule("0 0 1 1 *", async () => {
    console.log(" Запуск парсинга...");
    try {
      await StartParse();
      console.log("Парсинг успешно завершён.");
    } catch (error) {
      console.error("Ошибка при выполнении парсинга:", error);
    }
  });

  cron.schedule("0 3 * * *", async () => {
    console.log("📀 Запуск создания бэкапа...");
    try {
      createBackup();
      createMinioBackup();
      cleanupOldDBBackups();
      cleanupOldMinioBackups();
      console.log("✅ Бэкап успешно завершён.");
    } catch (error) {
      console.error("❌ Ошибка при создании бэкапа:", error);
    }
  });

  console.log("Cron задачи настроена");
};
