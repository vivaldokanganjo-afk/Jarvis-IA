const chat = document.getElementById("chat");
const input = document.getElementById("mensagem");
const btn = document.getElementById("send-btn");

// Criar mensagem no chat
function mensagem(texto, tipo) {
    const div = document.createElement("div");
    div.classList.add("msg", tipo);

    const hora = new Date().toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit"
    });

    div.innerHTML = `
        ${texto}
        <span class="time">${hora}</span>
    `;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// Mensagens iniciais
mensagem("Olá prezado, por favor diga a sua inquitação..", "support");

// Enviar mensagem
btn.addEventListener("click", async () => {
    const texto = input.value.trim();
    if (!texto) return;

    mensagem(texto, "user");
    input.value = "";

    // Indicador "digitando..."
    const typing = document.createElement("div");
    typing.classList.add("msg", "support");
    typing.textContent = "Jarvis está digitando...";
    chat.appendChild(typing);
    chat.scrollTop = chat.scrollHeight;

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: texto })
        });

        const data = await res.json();

        typing.remove();
        mensagem(data.resposta, "support");

    } catch (error) {
        typing.remove();
        mensagem("Erro ao comunicar com o assistente.", "support");
        console.error(error);
    }
});


// Navegação
function p7() {
    window.location.href = "../perfil.html";
}
function v1() {
    window.location.href = "chat-contact.html";
}
function v2() {
    window.location.href = "../HELP/help.html";
}
function v3() {
    window.location.href = "contact.html";
}
