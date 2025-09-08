import { client, TEXT_AI_MODELS } from "./ai_client";

async function test() {
  const res = await client.chat.completions.create({
    model: TEXT_AI_MODELS[0],
    messages: [{ role: "user", content: "Hello" }],
  });
  console.log(res.choices[0].message.content);
}
test();
