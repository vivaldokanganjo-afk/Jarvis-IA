import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function getOpenAIResponse(prompt) {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Você é o assistente JARVIS." },
                { role: "user", content: prompt }
            ]
        });

        return response.choices[0].message.content.trim();

    } catch (error) {
        console.error("❌ Erro OpenAI:", error);
        return "Erro ao contactar a IA.";
    }
}
