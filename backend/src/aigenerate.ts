// this file shall generate the ai roast response for the given pdf
import OpenAI from "openai";
import { OpenAIError } from "openai/error";

interface RoastResponse {
    success: boolean;
    content?: string;
    error?: string;
}

export async function ai_generate_roast(content: string): Promise<RoastResponse> {
    try {
        // Input validation
        if (!content || content.trim().length === 0) {
            return {
                success: false,
                error: "Resume content cannot be empty"
            };
        }

        if (!process.env.OPENAI_API_KEY) {
            return {
                success: false,
                error: "OpenAI API key is not configured"
            };
        }

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a professional roaster and stand-up comic with a sharp wit and deep understanding of the job market. Your task is to create a hilarious and brutally honest roast of the provided resume. Follow these guidelines:

1. Focus on the most roastable aspects of their experience, skills, and achievements
2. Use clever wordplay and industry-specific humor
3. Keep the roast concise (2-3 paragraphs max)
4. Maintain a balance between humor and wit - be savage but not mean-spirited
5. Reference specific details from their resume to make the roast more personal
6. Structure your roast with a strong opening line, followed by specific jabs at their experience, and end with a memorable punchline
7. Use emojis sparingly to enhance the humor
8. Avoid sensitive topics like race, gender, religion, or personal appearance
9. Keep the roast professional while being entertaining
10. Focus on career choices, skills, and experience rather than personal attributes

Remember: Your goal is to make them laugh while also making them think about their resume's presentation.`
                },
                { role: "user", content: `Here is the resume to roast: ${content}` }
            ],
            model: "gpt-4o-mini",
            temperature: 0.8, // Add some creativity while keeping it focused
            max_tokens: 500, // Limit response length
        });

        if (!chatCompletion.choices[0]?.message?.content) {
            return {
                success: false,
                error: "No response generated from OpenAI"
            };
        }

        return {
            success: true,
            content: chatCompletion.choices[0].message.content
        };

    } catch (error) {
        console.error("Error generating roast:", error);
        
        if (error instanceof OpenAIError) {
            return {
                success: false,
                error: `OpenAI API Error: ${error.message}`
            };
        }

        return {
            success: false,
            error: "An unexpected error occurred while generating the roast"
        };
    }
}