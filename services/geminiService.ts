
import { GoogleGenAI, Type } from "@google/genai";
import { GameConfig, Problem, GameMode } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getDifficultyDescription = (level: number): string => {
    switch (level) {
        case 1: return "very simple single-digit addition and subtraction (e.g., 2 + 3, 5 - 1). The total should not exceed 10.";
        case 2: return "single and double-digit addition/subtraction (e.g., 15 + 4, 20 - 8). No carrying or borrowing needed.";
        case 3: return "double-digit addition/subtraction with carrying/borrowing, and simple single-digit multiplication/division (e.g., 2x3, 10÷2).";
        case 4: return "multi-digit addition/subtraction, and multiplication/division facts up to 12x12.";
        case 5: return "complex multi-digit multiplication and division, and problems involving mixed operations.";
        case 6: return "all operations, including problems with simple fractions, decimals, or multi-step word problems.";
    }
    return "standard difficulty";
}

export const generateMathProblems = async (config: GameConfig): Promise<Problem[]> => {
    const { level, operation, rounds, gameMode } = config;
    
    const difficulty = getDifficultyDescription(level);
    const needsOptions = gameMode === GameMode.BalloonPop;

    const systemInstruction = `You are an expert curriculum designer for primary school mathematics. Your task is to generate ${rounds} age-appropriate math problems for a Primary Level ${level} student. The difficulty should be: ${difficulty}. The problems must strictly be about ${operation}. Ensure the answers are always integers.`;
    
    const userPrompt = `Generate the problems now. ${needsOptions ? 'For each problem, provide one correct answer and three plausible but incorrect integer options. Ensure the correct answer is one of the options.' : 'Just provide the question and the integer answer.'}`;

    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                question: {
                    type: Type.STRING,
                    description: "The math problem or question to be asked. e.g., '5 + 3 = ?' or 'If you have 8 apples and eat 2, how many are left?'"
                },
                answer: {
                    type: Type.NUMBER,
                    description: "The single, correct integer answer to the question."
                },
                ...(needsOptions && {
                    options: {
                        type: Type.ARRAY,
                        description: "An array of 4 distinct integers: one correct answer and three incorrect distractors.",
                        items: {
                            type: Type.NUMBER,
                        }
                    }
                })
            },
            required: needsOptions ? ['question', 'answer', 'options'] : ['question', 'answer']
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.8, // Add some variability for more interesting problems
            },
        });

        const jsonText = response.text.trim();
        const problems = JSON.parse(jsonText) as Problem[];

        // Data validation and cleanup
        return problems.map(p => ({
            ...p,
            question: p.question.replace(' = ?', '').replace('?', '').trim() + ' = ?'
        }));

    } catch (error) {
        console.error("Error generating problems from Gemini API:", error);
        throw new Error("Failed to generate math problems. The AI model might be busy. Please try again.");
    }
};
