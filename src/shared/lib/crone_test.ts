import cron from "node-cron"
import http from "http"

cron.schedule("* * * * * *",()=>{console.log("запуск задачи")})

const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Cron tasks are running\n');
        });

        const PORT = 3004;
        server.listen(PORT, () => {
          console.log(`Server running on port 3004`);
          });

          // 3. Обработка завершения процесса
          process.on('SIGTERM', () => {
            server.close(() => {
                console.log('Server closed');
                    process.exit(0);
                      });
                      });
