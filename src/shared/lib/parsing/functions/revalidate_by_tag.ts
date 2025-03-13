import fetch from "node-fetch"; // Для Node.js (или используй axios)
import dotenv from 'dotenv'
dotenv.config()
async function revalidateByTag(tag:string) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tag: tag, // Какой тег сбросить
      secret: process.env.REVALIDATE_SECRET, // Должен совпадать с .env
    }),
  });

  const data = await response.json();
  console.log("Revalidate response:", data);
}


