
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Predictive features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = 'gemini-2.5-flash';

export const getLunarPrediction = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "Prediction service is offline. API key is not configured.";
  }

  try {
    const systemInstruction = `You are a world-class NASA planetary scientist and data analyst with expertise in lunar geology, astrophysics, and mission history. Analyze the user's query in the context of the GLEE mission and historical lunar data. Provide a detailed, data-driven, and insightful prediction. Your tone should be professional, confident, and scientific.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.9,
        }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching prediction from Gemini API:", error);
    if (error instanceof Error) {
        return `Error from prediction service: ${error.message}`;
    }
    return "An unknown error occurred while fetching the prediction.";
  }
};

export const getCorrelationAnalysis = async (factors: string[]): Promise<string> => {
  if (!API_KEY) {
    return "Analysis service is offline. API key is not configured.";
  }

  const prompt = `Analyze the cross-impact of the following lunar environmental factors for the GLEE mission lander.
  
  Factors:
  - ${factors[0]}
  - ${factors[1]}
  
  Predict the consequential impact on: ${factors[2]}.
  
  Provide a concise, scientific explanation of the likely outcome and the physical principles involved (e.g., plasma interference, material thermal expansion, signal degradation). Conclude with a recommendation for the mission operators.`;

  try {
    const systemInstruction = `You are a specialized GLEE mission AI, an expert in astrophysics, sensor physics, and space communication. Your role is to analyze complex environmental correlations and provide actionable intelligence to the flight director. Your analysis must be grounded in scientific principles.`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            systemInstruction,
            temperature: 0.6,
        }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching correlation analysis from Gemini API:", error);
    if (error instanceof Error) {
        return `Error from analysis service: ${error.message}`;
    }
    return "An unknown error occurred while fetching the analysis.";
  }
};
