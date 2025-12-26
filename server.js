// --- Imports ---
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { db } from "./firebaseAdmin.js";


dotenv.config();

// --- Configuração express ---
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- Configuração OpenAI ---
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// --- Endpoint principal (/api/chat) ---
app.post("/api/chat", async (req, res) => {
    const { prompt, userId } = req.body;

    if (!prompt) {
        return res.status(400).json({ resposta: "Mensagem vazia." });
    }

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Você é o JARVIS, um assistente educado." },
                { role: "user", content: prompt }
            ]
        });

        const resposta = response.choices[0].message.content.trim();

        // 🔥 SALVAR NO FIREBASE
        await db.collection("conversas").add({
            userId: userId || "anonimo",
            pergunta: prompt,
            resposta,
            createdAt: new Date()
        });

        res.json({ resposta });

    } catch (error) {
        console.error("Erro IA:", error);
        res.status(500).json({ resposta: "Erro ao comunicar com a IA." });
    }
});


// --- Iniciar Servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor JARVIS ativo em http://localhost:${PORT}`);
});
