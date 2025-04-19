// import { IgApiClient } from "instagram-private-api";
// import { readFile, writeFile } from "fs/promises";
// import { existsSync, readFileSync, writeFileSync } from "fs";
// import { tmpdir } from "os";
// import { join } from "path";
// import axios from "axios";
// import readline from "readline";
// import { privateConfig } from "../../config/private";

// const SESSION_FILE = "ig-session.json";

// async function getInstagramClient(): Promise<IgApiClient> {
//   const ig = new IgApiClient();
//   ig.state.generateDevice(privateConfig.INSTAGRAM_LOGIN || "");

//   if (existsSync(SESSION_FILE)) {
//     const saved = JSON.parse(readFileSync(SESSION_FILE, "utf-8"));
//     await ig.state.deserialize(saved);
//     console.log("✅ Сессия Instagram восстановлена.");
//     return ig;
//   }

//   try {
//     await ig.account.login(privateConfig.INSTAGRAM_LOGIN || "", privateConfig.INSTAGRAM_PASSWORD || "");
//     console.log("✅ Успешный вход в Instagram.");
//     const session = await ig.state.serialize();
//     delete session.constants;
//     writeFileSync(SESSION_FILE, JSON.stringify(session));
//     return ig;
//   } catch (error) {
//     if (error === "IgCheckpointError") {
//       console.log("⚠️ Требуется подтверждение (checkpoint).");

//       await ig.challenge.auto(true);
//       const step_name = ig.state.checkpoint;

//       console.log(`📲 Challenge step: ${step_name}`);

//       const code = await promptCode("Введите код из Instagram: ");
//       await ig.challenge.sendSecurityCode(code);

//       const session = await ig.state.serialize();
//       delete session.constants;
//       writeFileSync(SESSION_FILE, JSON.stringify(session));
//       console.log("✅ Challenge пройден, сессия сохранена.");
//       return ig;
//     }

//     console.error("❌ Ошибка входа в Instagram:", error);
//     throw error;
//   }
// }

// function promptCode(promptText: string): Promise<string> {
//   return new Promise((resolve) => {
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });

//     rl.question(promptText, (answer: string) => {
//       rl.close();
//       resolve(answer.trim());
//     });
//   });
// }

// export async function publishToInstagram({
//   type,
//   slug,
//   meta_description,
//   ruTitle,
//   previewImage,
//   tags,
// }: {
//   type: "news" | "reviews";
//   slug: string;
//   ruTitle: string;
//   meta_description: string;
//   previewImage: string;
//   tags: string[];
// }) {
//   try {
//     if (!privateConfig.INSTAGRAM_LOGIN || !privateConfig.INSTAGRAM_PASSWORD) {
//       console.log("❌ Instagram credentials not set.");
//       return;
//     }

//     const ig = await getInstagramClient();

//     const imageUrl = `https://tech24view.ru${previewImage}`;
//     const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

//     const tempPath = join(tmpdir(), `insta-${Date.now()}.jpg`);
//     await writeFile(tempPath, response.data);

//     const caption = `
// ${type === "news" ? "📰" : "📱"} ${ruTitle}

// ${meta_description}

// 🔗 tech24view.ru/${type}/${slug}

// ${tags.map((tag) => `#${tag}`).join(" ")} ${type === "news" ? "#Новости #Технологии" : "#Обзоры #Гаджеты"}
//     `.trim();

//     await ig.publish.photo({
//       file: await readFile(tempPath),
//       caption,
//     });

//     console.log("✅ Пост успешно опубликован в Instagram!");
//   } catch (error) {
//     console.error("❌ Ошибка при публикации в Instagram:", error);
//   }
// }
