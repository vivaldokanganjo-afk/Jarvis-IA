// --- Firebase e logout ---
function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../index-principal.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

function p0(){
    window.location.href = "../index.html";
}

function p1(){
    window.location.href = "personal-info.html";
}

function p2(){
    window.location.href = "./CONTACTE-NOS/contact.html";
}

function p3(){
    window.location.href = "./HELP/help.html";
}

function p4(){
    window.location.href = "./ABOUT US/about.html";

}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const nome = user.displayName || "Usuário";
        document.getElementById("user-name").innerText = nome;
    }
});
