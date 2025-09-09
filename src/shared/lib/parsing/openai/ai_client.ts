import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: "",
  baseURL: "http://localhost:1337/v1",
});

export const TEXT_AI_MODELS = [
  "gpt-4.5",
  "gpt-4o",
  "gpt-4",
  "gpt-4o-mini",
  "deepseek-r1",
  "o4",
  "o3",
  "o1",
];
export const IMAGE_AI_MODEL = "flux";
