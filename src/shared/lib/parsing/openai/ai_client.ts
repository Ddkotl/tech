import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: "",
  baseURL: "http://localhost:1337/v1",
});

export const TEXT_AI_MODELS =  ["deepseek-v3","deepseek-v3.1","llama","gpt-4"]
export const IMAGE_AI_MODEL = "flux";
