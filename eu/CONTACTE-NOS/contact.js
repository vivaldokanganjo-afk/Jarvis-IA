const chat = document.getElementById("chat");

function mensagem(texto, tipo) {
    const div = document.createElement("div");
    div.classList.add("msg", tipo);
    div.innerHTML = `
        ${texto}
        <span class="time">02:44 PM</span>`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

mensagem("Muito obrigado pelo feedback prezado.", "support");
mensagem("nada por isso", "user");


//Voltar a pagina
function p7(){
    window.location.href = "../perfil.html"
}

//Avançar para as mensagens
function v1(){
    window.location.href = "chat-contact.html"
}

//avançar para as questões frequentes
function v2(){
    window.location.href = "../HELP/help.html"
}

//voltar para o Centro de contacto
function v3(){
    window.location.href = "contact.html"
}