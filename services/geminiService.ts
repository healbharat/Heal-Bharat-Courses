import { GoogleGenAI, Type } from "@google/genai";
import type { ChatMessage, CodingProblem } from '../types';

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a behavioral interview question.
 * @returns A promise that resolves to a string containing one interview question.
 */
export const getInterviewQuestion = async (): Promise<string> => {
  try {
    const systemInstruction = `You are a senior hiring manager at a top tech company like Google or Amazon. 
    Your task is to ask one, and only one, common behavioral interview question. 
    The question should be open-ended and designed to understand a candidate's past experiences and soft skills.
    Do not add any preamble like "Here is your question:". Just state the question directly.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Ask me a behavioral question.",
        config: {
            systemInstruction: systemInstruction,
        }
    });

    return response.text;
  } catch (error)    {
    console.error("Error getting interview question from Gemini:", error);
    return "Tell me about a time you had a conflict with a coworker and how you resolved it.";
  }
};

/**
 * Generates a response from the AI chatbot based on conversation history.
 * @param history An array of ChatMessage objects representing the conversation.
 * @returns A promise that resolves to the AI's response text.
 */
export const getChatbotResponse = async (history: ChatMessage[]): Promise<string> => {
  try {
    const systemInstruction = `You are Tronex AI, a helpful and highly intelligent AI assistant specializing in coding and web development. 
    Your goal is to provide accurate, concise, and easy-to-understand answers to the user's questions. 
    When providing code snippets, always wrap them in markdown code blocks with the correct language identifier (e.g., \`\`\`javascript).`;

    // FIX: Convert chat history to the format expected by the Gemini API
    const contents = history.map(msg => ({
        // The API uses 'model' for the AI's role
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error getting chatbot response from Gemini:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again.";
  }
};


/**
 * Generates a coding challenge based on a course title.
 * @param courseTitle The title of the course to base the challenge on.
 * @returns A promise that resolves to a CodingProblem object.
 */
export const generateCodingChallenge = async (courseTitle: string): Promise<CodingProblem> => {
  try {
    const systemInstruction = `You are an expert programming challenge creator for a web development learning platform. 
    Your task is to generate a single, relevant coding challenge based on the provided course title.
    - The difficulty must be 'Easy' or 'Medium'.
    - The category should be a relevant programming concept (e.g., 'Arrays', 'Strings', 'DOM Manipulation').
    - The description must be in Markdown format, explaining the problem clearly.
    - The starterCode must be in JavaScript.
    - The functionName must match the function in the starterCode.
    - You must provide 2 examples with inputs and expected string outputs.
    - IMPORTANT: You must strictly adhere to the provided JSON schema. Your entire response must be only the valid JSON object, with no explanatory text, comments, or markdown formatting around it.`;
    
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['Easy', 'Medium'] },
            category: { type: Type.STRING },
            description: { type: Type.STRING },
            starterCode: { type: Type.STRING },
            functionName: { type: Type.STRING },
            examples: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        input: { type: Type.ARRAY, items: { type: Type.STRING } },
                        inputText: { type: Type.STRING },
                        output: { type: Type.STRING },
                        explanation: { type: Type.STRING, nullable: true },
                    },
                    required: ['input', 'inputText', 'output'],
                },
            },
        },
        required: ['title', 'difficulty', 'category', 'description', 'starterCode', 'functionName', 'examples'],
    };


    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a JSON object for a coding challenge based on the course: "${courseTitle}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });
    
    let jsonString = response.text.trim();
    
    // Attempt to find and extract a valid JSON object from the response string,
    // in case the model wraps it with markdown or other text.
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonString = jsonMatch[0];
    } else {
        // If no JSON object is found, the response is invalid.
        throw new Error("Response did not contain a valid JSON object.");
    }

    const parsedResponse = JSON.parse(jsonString);

    // The Gemini response doesn't conform to our internal CodingProblem shape for examples.input. Let's fix it.
    // The schema asks for an array of strings, but the real data is any[]. We'll parse the strings.
    const fixedExamples = parsedResponse.examples.map((ex: any) => ({
      ...ex,
      input: ex.input.map((i: string) => {
        try {
            return JSON.parse(i)
        } catch {
            // if it's already a non-stringified value (e.g. just a string from the input) return as is
            return i;
        }
      }),
    }));
    
    // We need to add an ID for our internal state management
    const problem: CodingProblem = {
        ...parsedResponse,
        id: Date.now(),
        examples: fixedExamples,
    };
    
    return problem;

  } catch (error) {
    console.error("Error generating coding challenge from Gemini:", error);
    if (error instanceof SyntaxError) {
        console.error("The response from the AI was not valid JSON.");
    }
    throw new Error("Failed to generate a coding challenge. The AI may be temporarily unavailable.");
  }
};

/**
 * Generates a summary and key learning points for a course.
 * @param courseTitle The title of the course.
 * @param courseDescription The description of the course.
 * @returns A promise that resolves to a markdown string with the notes.
 */
export const generateCourseNotes = async (courseTitle: string, courseDescription: string): Promise<string> => {
  try {
    const systemInstruction = `You are an expert academic assistant. Your task is to generate concise and structured study notes for a given online course.
    The notes should be in Markdown format.
    - Start with a brief, one-paragraph summary of the course.
    - Follow with a bulleted list of "Key Learning Objectives" or "Core Concepts". Use the format '* ' for bullet points.
    - The tone should be helpful, clear, and encouraging.
    - Do not include any preamble like "Here are your notes:". Start directly with the summary.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate notes for the course titled "${courseTitle}". Course Description: "${courseDescription}"`,
        config: {
            systemInstruction: systemInstruction,
        }
    });

    return response.text;
  } catch (error)    {
    console.error("Error generating course notes from Gemini:", error);
    return "### Error\n\nI was unable to generate notes for this course. The AI service may be temporarily unavailable. Please try again later.";
  }
};

/**
 * Generates a summary and key learning points for a specific course section.
 * @param sectionTitle The title of the course section.
 * @param sectionDescription The description of the course section.
 * @returns A promise that resolves to a markdown string with the notes.
 */
export const generateCourseSectionNotes = async (sectionTitle: string, sectionDescription: string): Promise<string> => {
  try {
    const systemInstruction = `You are an expert academic assistant. Your task is to generate concise and structured study notes for a given online course section.
    The notes should be in Markdown format.
    - Start with a brief, one-paragraph summary of the section's content.
    - Follow with a bulleted list of "Key Concepts Covered" from this specific section. Use the format '* ' for bullet points.
    - Keep the notes focused only on the provided section title and description.
    - The tone should be helpful, clear, and encouraging.
    - Do not include any preamble like "Here are your notes:". Start directly with the summary.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate notes for the course section titled "${sectionTitle}". Section Description: "${sectionDescription}"`,
        config: {
            systemInstruction: systemInstruction,
        }
    });

    return response.text;
  } catch (error)    {
    console.error("Error generating course section notes from Gemini:", error);
    return "### Error\n\nI was unable to generate notes for this section. The AI service may be temporarily unavailable. Please try again later.";
  }
};