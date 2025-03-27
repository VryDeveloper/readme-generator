import { GoogleGenAI } from "@google/genai";
import React, { useState } from "react";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const googleAiApiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

const ai = new GoogleGenAI({ apiKey: googleAiApiKey });

export const generateReadme = async (projectDescription, useGoogleAI = true) => {
  try {
    await delay(2000);

    if (useGoogleAI) {
      // Usando Google Gemini
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Crie um README.md bem estruturado para o seguinte projeto. Inclua título, descrição, instruções de instalação, uso, contribuição e licença. Formate corretamente em Markdown:\n\n${projectDescription}`,
      });
      return response.text.trim();
    } else {
      // Usando OpenAI
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Você é um assistente útil e criativo que ajuda a criar documentos de README estruturados.",
            },
            {
              role: "user",
              content: `Gere uma receita de bolo de chocolate`,
            },
          ],
          max_tokens: 1500,
          temperature: 0.5,
          top_p: 0.9,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao gerar o README");
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    }
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    throw error;
  }
};

const AIGenerator = ({ onGenerateReadme, onBack }) => {
  const [projectDescription, setProjectDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [useGoogleAI, setUseGoogleAI] = useState(false);

  const handleGenerate = async () => {
    if (!projectDescription.trim()) return;
    
    setIsGenerating(true);
    setError("");
    
    try {
      const generatedReadme = await generateReadme(projectDescription, useGoogleAI);
      onGenerateReadme(generatedReadme);
    } catch (error) {
      setError("Erro ao gerar o README. Por favor, tente novamente.");
      console.error("Erro ao gerar README:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Gerar README com IA
          </h3>
          <button
            onClick={onBack}
            className="flex items-center px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descrição do Projeto
            </label>
            <textarea
              id="description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Descreva seu projeto em detalhes (tecnologias utilizadas, objetivos, funcionalidades principais...)"
              className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Quanto mais detalhada for a descrição, melhor será o README gerado.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="useGoogleAI"
              checked={useGoogleAI}
              onChange={() => setUseGoogleAI(!useGoogleAI)}
              className="w-4 h-4"
            />
            <label htmlFor="useGoogleAI" className="text-sm text-gray-700 dark:text-gray-300">
              Usar Google Gemini
            </label>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !projectDescription.trim()}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-white transition-colors ${
              isGenerating || !projectDescription.trim()
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gerando README...
              </>
            ) : (
              "Gerar README com IA"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;
