import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: "",
  baseURL: "http://localhost:1337/v1",
});

export const TEXT_AI_MODELS =  [
  "gpt-4o",
  "gpt-4.1",
  "gpt-4",
  "gpt-4o-mini",
  "gpt-3.5-turbo",
];
export const IMAGE_AI_MODEL = "flux";
