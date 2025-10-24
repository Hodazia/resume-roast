"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ai_generate_roast = ai_generate_roast;
// thie file shall generate the ai roast response for the given pdf
const openai_1 = __importDefault(require("openai"));
const error_1 = require("openai/error");
function getPersonaInstruction(persona) {
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
function getIntensityInstruction(intensity) {
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
function getSectionInstruction(sections) {
    if (!sections || sections.length === 0)
        return '';
    return `Focus your roast on these sections: ${sections.join(', ')}.`;
}
function ai_generate_roast(content_1) {
    return __awaiter(this, arguments, void 0, function* (content, options = {}) {
        var _a, _b;
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
            const systemPrompt = `${personaInstruction} Your task is to create a hilarious and brutally honest roast of the provided resume. ${intensityInstruction} ${sectionInstruction}
Follow these guidelines:
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
Remember: Your goal is to make them laugh while also making them think about their resume's presentation.`;
            const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
            const chatCompletion = yield openai.chat.completions.create({
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
            if (!((_b = (_a = chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content)) {
                return {
                    success: false,
                    error: "No response generated from OpenAI"
                };
            }
            return {
                success: true,
                content: chatCompletion.choices[0].message.content
            };
        }
        catch (error) {
            console.error("Error generating roast:", error);
            if (error instanceof error_1.OpenAIError) {
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
    });
}
