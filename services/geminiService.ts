import { GoogleGenAI, Type } from "@google/genai";
import { JamaahProfile } from "../types";

// Function to get program suggestions based on aggregate data
export const getAIProgramSuggestions = async (jamaahList: JamaahProfile[]): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key missing");
    return "API Key is required for AI suggestions.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Summarize data for the prompt to avoid token limits with large datasets
  const totalJamaah = jamaahList.length;
  const unemployed = jamaahList.filter(j => j.employmentStatus === 'Unemployed').length;
  const muzakki = jamaahList.filter(j => j.economicStatus === 'Muzakki (High Net Worth)').length;
  const elderly = jamaahList.filter(j => j.age > 60).length;
  const youth = jamaahList.filter(j => j.age < 30).length;
  
  const prompt = `
    Sebagai konsultan inovasi Masjid Profesional, berikan 3 ide program masjid yang unik dan modern berdasarkan data demografi jamaah berikut:
    - Total Jamaah: ${totalJamaah}
    - Pengangguran: ${unemployed}
    - Muzakki (Kaya): ${muzakki}
    - Lansia: ${elderly}
    - Pemuda: ${youth}

    Berikan respon dalam format JSON Array sederhana dengan field: title, description, estimatedBudget.
    Gunakan Bahasa Indonesia.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              estimatedBudget: { type: Type.STRING }, // String to handle currency format easily
            }
          }
        }
      }
    });

    return response.text || "[]";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "[]";
  }
};
