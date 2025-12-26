// Elementos do DOM
const chatBox = document.getElementById('chat');
const input = document.getElementById('manual-input');
const btnStartInput = document.getElementById('btn-start'); // botão de enviar texto
const voiceBtn = document.getElementById('voice-btn');      // botão de voz
const output = document.getElementById("output");
const startBtn = document.getElementById("start-btn");

/*
// --- Firebase e logout ---
function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "index-principal.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}
*/

function goPerfil(){
    window.location.href = "../eu/perfil.html";
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const nome = user.displayName || "Usuário";
        document.getElementById("user-name").innerText = nome;
    }
});

// --- Funções de voz ---
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "pt-PT";
recognition.interimResults = false;

function speak(text){
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "pt-PT";
    speechSynthesis.speak(utter);
}

// --- Função para adicionar mensagem ao chat ---
function addMessage(content, sender){
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.textContent = content;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// --- Função para enviar pergunta ao GPT ---
async function askGPT(prompt){
    try {
        // Adiciona mensagem do usuário
        addMessage(prompt, 'user');

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        const resposta = data.resposta || "Erro: sem resposta do servidor.";

        // Adiciona mensagem do Jarvis
        addMessage(resposta, 'jarvis');

        // Fala a resposta
        speak(resposta);

        // Atualiza output (caso queira manter)
        output.textContent = resposta;
    } catch(error){
        output.textContent = "Erro ao comunicar com o servidor.";
        console.error(error);
    }
}

// --- Reconhecimento de voz ---
recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    addMessage(command, 'user'); // adiciona no chat
    askGPT(command);             // envia para GPT
};

// Botão de voz do chat
voiceBtn.addEventListener('click', () => {
    recognition.start();
});

// Botão de enviar texto manual
btnStartInput.addEventListener('click', () => {
    const message = input.value.trim();
    if (!message) return;
    input.value = '';
    askGPT(message);
});

// Pressionar Enter envia mensagem
input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') btnStartInput.click();
});

// Botão de ativar reconhecimento de voz principal
startBtn.addEventListener("click", () => {
    recognition.start();
});



//Antigo script.js
/*const output = document.getElementById("output"); 
const startBtn = document.getElementById("start-btn");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "pt-PT";
recognition.interimResults = false;

function speak(text){
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "pt-PT";
    speechSynthesis.speak(utter);
}

async function askGPT(prompt) {
    try {
        const res = await fetch("/api/chat", {  // atualizado para /api/chat
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        output.textContent = data.resposta; // corrigido: server responde {resposta}
        speak(data.resposta);
    } catch(error) {
        output.textContent = "Erro ao comunicar com o servidor.";
        console.error(error);
    }
}

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    output.textContent = "Você disse: " + command;
    askGPT(command);
};

startBtn.addEventListener("click", () => {
    recognition.start();
});

// Fazer logout da conta
function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "index-principal.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const nome = user.displayName || "Usuário";
        document.getElementById("user-name").innerText = nome;
    }
});*/


