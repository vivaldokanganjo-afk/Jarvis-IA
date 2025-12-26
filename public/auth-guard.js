firebase.auth().onAuthStateChanged(user => {
  if (!user){
    // Já está logado → manda direto para HOME
    window.location.href = "index-principal.html";
  }
})