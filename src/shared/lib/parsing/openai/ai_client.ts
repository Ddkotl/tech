import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: "",
  baseURL: "http://localhost:1337/v1",
});

export const TEXT_AI_MODEL = "gpt-4o";
export const IMAGE_AI_MODEL = "flux";
