import { client, IMAGE_AI_MODEL } from "./ai_client";

export const GenerateImage = async (text: string): Promise<string> => {
  const chatCompletion = await client.images.generate({
    prompt: `${text}`,
    model: IMAGE_AI_MODEL,
    response_format: "url",
  });
  return chatCompletion.data[0].url ? chatCompletion.data[0].url : "";
};

(async () => {
  try {
    const imageUrl = await GenerateImage("нарисуй пингвина ");
    console.log("Generated Image URL:", imageUrl);
  } catch (error) {
    console.error("Error in IIFE:", error);
  }
})();
