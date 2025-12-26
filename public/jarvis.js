import "./script.js";
import { responderComandoBasico } from "./commands/basicCommands.js";

// Reconhecimento de voz
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "pt-PT";

// Botão voz
document.getElementById("start-btn").addEventListener("click", () => {
    recognition.start();
});

// Texto manual
document.getElementById("btn-start").addEventListener("click", () => {
    const prompt = document.getElementById("manual-input").value;
    if (prompt) enviarPergunta(prompt);
});

async function enviarPergunta(prompt) {
    mostrarNaTela(`Você disse: ${prompt}`);

    // 🟢 1️⃣ COMANDOS OFFLINE (NÃO CHAMA IA)
    const respostaLocal = responderComandoBasico(prompt);
    if (respostaLocal) {
        mostrarNaTela(`Jarvis: ${respostaLocal}`);
        return;
    }

    // 🔴 2️⃣ IA (BACKEND)
    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();
        mostrarNaTela(`Jarvis: ${data.resposta}`);
    } catch {
        mostrarNaTela("Erro ao comunicar com a IA.");
    }
}

// Voz
recognition.onresult = async (e) => {
    const texto = e.results[0][0].transcript;
    await enviarPergunta(texto);

    // 🟡 COMANDO: ADICIONAR TAREFA
    if (texto.toLowerCase().includes("adicionar tarefa")) {
        const tarefa = texto.replace("adicionar tarefa", "").trim();

        const user = firebase.auth().currentUser;

        if (!user) {
            mostrarNaTela("Você precisa estar logado.");
            return;
        }

        await window.saveTask(tarefa);
        mostrarNaTela("Tarefa adicionada.");
    }
};

function mostrarNaTela(msg) {
    const chat = document.getElementById("chat");
    const div = document.createElement("div");
    div.textContent = msg;
    chat.appendChild(div);
}
