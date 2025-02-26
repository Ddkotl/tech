import { exec } from "child_process";

const TOR_CONTAINER_NAME = "tor_proxy"; // Замените на имя вашего контейнера

const waitForContainerToBeHealthy = (
  containerName: string,
  timeout: number = 30000,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkContainerStatus = () => {
      exec(
        `docker inspect --format '{{.State.Health.Status}}' ${containerName}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(
              `Ошибка при проверке состояния контейнера: ${stderr}`,
            );
            return reject(error);
          }

          if (stdout.trim() === "healthy") {
            resolve();
          } else if (Date.now() - startTime > timeout) {
            reject(
              new Error(
                `Tor не стал здоровым в течение ${timeout / 1000} секунд`,
              ),
            );
          } else {
            // Проверяем статус контейнера через 1 секунду, если он еще не стал "healthy"
            setTimeout(checkContainerStatus, 1000);
          }
        },
      );
    };

    checkContainerStatus();
  });
};

export const restartTor = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(
      `docker restart ${TOR_CONTAINER_NAME}`,
      async (error, stdout, stderr) => {
        if (error) {
          console.error(`Ошибка при перезапуске Tor: ${stderr}`);
          return reject(error);
        }
        // Ждем, пока контейнер станет "healthy"
        try {
          await waitForContainerToBeHealthy(TOR_CONTAINER_NAME);
          // console.log(
          //   `Контейнер ${stdout} перезапущен и готов к использованию.`,
          // );
          resolve();
        } catch (err) {
          console.error("Ошибка при ожидании состояния Tor контейнера:", err);
          reject(err);
        }
      },
    );
  });
};
