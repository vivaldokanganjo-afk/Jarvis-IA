//Mostrar o nome do usuario
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const nome = user.displayName || "Usuário";
        document.getElementById("user-name").innerText = nome;
    }
});

//Mostrar o email do usuario
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const nome = user.displayEmail || "Usuário";
        document.getElementById("user-email").innerText = nome;
    }
});


//Voltar de pagina
function p6(){
    window.location.href = "perfil.html";
}