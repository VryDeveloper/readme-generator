import { GoogleGenAI } from "@google/genai";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const googleAiApiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

const ai = new GoogleGenAI({ apiKey: googleAiApiKey });

export const generateReadme = async (projectDescription) => {
  try {
    await delay(2000);
    
    const model = ai.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      `Crie um README.md bem estruturado para o seguinte projeto. Inclua título, descrição, instruções de instalação, uso, contribuição e licença. Formate corretamente em Markdown:\n\n${projectDescription}`
    );
    
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Erro ao gerar README:", error);
    throw new Error("Falha ao gerar o README");
  }
};
 
