const firebaseConfig = {
    apiKey: "AIzaSyBAKx9pKPoU1i5__6brcXy1PzReO_1VZQc",
    authDomain: "mate5s.firebaseapp.com",
    projectId: "mate5s",
    storageBucket: "mate5s.firebasestorage.app",
    messagingSenderId: "452169560696",
    appId: "1:452169560696:web:7b44450b63a76496e6338d"
};

// Inicializa apenas uma vez
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// 🔥 EXPÕE A FUNÇÃO GLOBALMENTE
window.saveTask = async function (tarefa) {
    const user = firebase.auth().currentUser;

    if (!user) {
        console.warn("Usuário não logado");
        return;
    }

    return db
        .collection("users")
        .doc(user.uid)
        .collection("tasks")
        .add({
            tarefa,
            criadoEm: new Date()
        });
};
