import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion } from '../types';

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Gets a response from the AI tutor.
 * @param lessonContext - The notes from the current lesson.
 * @param lessonTopic - The topic of the current lesson.
 * @param question - The user's question.
 * @returns The AI's response as a string.
 */
export const getTutorResponse = async (lessonContext: string, lessonTopic: string, question: string): Promise<string> => {
  try {
    const systemInstruction = `You are an expert AI Tutor. Your student is currently learning about "${lessonTopic}". 
    Your role is to help them understand the concepts from their lesson. 
    Use the provided lesson notes as the primary source of truth. 
    Explain concepts clearly and concisely. Provide simple code examples if relevant. 
    Be encouraging and supportive. Do not answer questions that are outside the scope of web development, programming, or the current lesson's context.
    
    LESSON NOTES:
    ---
    ${lessonContext}
    ---
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
        config: {
            systemInstruction: systemInstruction,
            thinkingConfig: { thinkingBudget: 0 } // Use low latency for chat
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};

const quizSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: {
          type: Type.STRING,
          description: "The quiz question."
        },
        options: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 4 possible answers."
        },
        correctAnswer: {
          type: Type.STRING,
          description: "The correct answer, which must be one of the strings in the 'options' array."
        }
      },
      required: ["question", "options", "correctAnswer"]
    }
};

/**
 * Generates a short practice quiz based on lesson content.
 * @param lessonNotes - The notes from the current lesson.
 * @param lessonTopic - The topic of the current lesson.
 * @returns A promise that resolves to an array of QuizQuestion objects.
 */
export const generatePracticeQuiz = async (lessonNotes: string, lessonTopic: string): Promise<QuizQuestion[]> => {
    try {
        const systemInstruction = `You are an expert quiz designer. Your task is to create a short, 3-question multiple-choice quiz based on the provided lesson notes to help a student test their understanding.
        
        RULES:
        - The questions must be directly related to the content of the lesson notes.
        - Each question must have exactly 4 plausible options.
        - One option must be clearly the correct answer based on the notes.
        - The value for 'correctAnswer' must be an exact match to one of the strings in the 'options' array.
        - Generate exactly 3 questions.
        
        LESSON TOPIC: "${lessonTopic}"
        
        LESSON NOTES:
        ---
        ${lessonNotes}
        ---
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate the 3-question quiz now.",
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: quizSchema,
            }
        });
        
        const jsonText = response.text.trim();
        const quizData = JSON.parse(jsonText);
        
        if (!Array.isArray(quizData)) {
            throw new Error("AI did not return a valid array for the quiz.");
        }
        
        // Basic validation
        return quizData.filter(q => q.question && q.options && q.correctAnswer && Array.isArray(q.options) && q.options.includes(q.correctAnswer));

    } catch (error) {
        console.error("Error generating practice quiz:", error);
        throw new Error("Failed to generate a practice quiz. The AI tutor might be busy. Please try again later.");
    }
};
