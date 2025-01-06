// src/lib/setupCron.ts
import cron from "node-cron";
import { StartParse } from ".";

export const setupCron = () => {
  // Запуск задачи каждый час
  cron.schedule("0 * * * *", async () => {
    console.log(" Запуск парсинга...");
    try {
      await StartParse();
      console.log("Парсинг успешно завершён.");
    } catch (error) {
      console.error("Ошибка при выполнении парсинга:", error);
    }
  });

  console.log("Cron задача настроена: Парсинг выполняется каждый час.");
};
