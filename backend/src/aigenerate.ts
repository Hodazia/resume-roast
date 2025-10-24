// thie file shall generate the ai roast response for the given pdf
import OpenAI from "openai";
import { OpenAIError } from "openai/error";

interface RoastOptions {
    intensity?: string; // e.g., 'mild', 'medium', 'spicy'
    persona?: string;   // e.g., 'hr', 'tech', 'ceo'
    sections?: string[];
}

interface RoastResponse {
    success: boolean;
    content?: string;
    error?: string;
}

function getPersonaInstruction(persona: string) {
    switch (persona) {
        case 'hr':
            return 'You are a grumpy HR manager with a dry sense of humor.';
        case 'tech':
            return 'You are a sarcastic tech recruiter who loves tech puns.';
        case 'ceo':
            return 'You are a deadpan CEO who roasts with wit and brevity.';
        default:
            return 'You are a professional roaster and stand-up comic.';
    }
}

function getIntensityInstruction(intensity: string) {
    switch (intensity) {
        case 'mild':
            return 'Keep the roast light, playful, and mostly friendly.';
        case 'medium':
            return 'Use medium sarcasm and wit, but avoid being too harsh.';
        case 'spicy':
            return 'Go all out with a spicy, savage roast, but avoid being mean-spirited.';
        default:
            return 'Keep the roast witty and entertaining.';
    }
}

function getSectionInstruction(sections: string[]) {
    if (!sections || sections.length === 0) return '';
    return `Focus your roast on these sections: ${sections.join(', ')}.`;
}

export async function ai_generate_roast(content: string, options: RoastOptions = {}): Promise<RoastResponse> {
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

        const { intensity = 'medium', persona = 'hr', sections = [] } = options;
        const personaInstruction = getPersonaInstruction(persona);
        const intensityInstruction = getIntensityInstruction(intensity);
        const sectionInstruction = getSectionInstruction(sections);

        const systemPrompt = `${personaInstruction} Your task is to deliver a brutally funny AND painfully honest evaluation of the provided resume. 
First: ROAST it mercilessly. Then: Provide ruthless but useful improvements to help them actually get hired.
${intensityInstruction} ${sectionInstruction}

Follow these rules:

🔥 PART 1 — The Roast
1. Go all-in. Be savagely sarcastic while staying professional and career-focused.
2. Highlight the weakest, most boring, most confusing parts of their experience, skills, or achievements.
3. Use clever wordplay, industry-specific humor, and well-timed emojis (sparingly).
4. 2–3 paragraphs max: 
   - Paragraph 1: Brutal opening line + theme of failure
   - Paragraph 2: Precise jabs with receipts from the resume
   - Final punchline: A mic-drop roast they’ll remember forever.
5. Avoid sensitive personal attributes (race, gender, religion, body, etc.).
6. Keep the target laughing while questioning all their career choices.

🛠 PART 2 — The Glow-Up (Improvements)
7. Rewrite their worst bullets into stronger, quantified ones.
8. Suggest missing skills, metrics, structure, and ATS-friendly formatting.
9. Provide a short checklist of the biggest fixes that will instantly level up the resume.

Overall Goal:
Make them laugh. Make them cry. Make their resume better.
`
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        
    const chatCompletion = await openai.chat.completions.create({
        messages: [
                {
                    role: "system",
                    content: systemPrompt
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