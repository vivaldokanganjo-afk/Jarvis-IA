// Usuario continua logado
firebase.auth().onAuthStateChanged(user => {
  if (user){
    // Já está logado → manda direto para HOME
    window.location.href = "../index.html";
  }
});


// public/logs/index.js
(() => {
  // helpers para acessar DOM
  const form = {
    email: () => document.getElementById("email"),
    emailValidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPassword: () => document.getElementById("recover-password-button")
  };

  // --- Validações/estado inicial ---
  function isEmailValid() {
    const email = form.email().value;
    if (!email) return false;
    // usa validateEmail() do validations.js (já tens)
    return validateEmail(email);
  }

  function isPasswordValid() {
    const password = form.password().value;
    return !!password;
  }

  function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailValidError().style.display = validateEmail(email) ? "none" : "block";
  }

  function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
  }

  function toggleButtonDisable() {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
  }

  // --- Mensagens de erro amigáveis ---
  function getLoginErrorMessage(error) {
    // compat com códigos do Firebase Auth
    if (!error || !error.code) return "Erro no login: " + (error && error.message ? error.message : "");
    if (error.code === "auth/invalid-email") return "Email inválido.";
    if (error.code === "auth/user-disabled") return "Conta desativada.";
    if (error.code === "auth/user-not-found") return "Usuário não encontrado.";
    if (error.code === "auth/invalid-credential") return "Senha ou Email incorretos.";
    if (error.code === "auth/too-many-requests") return "Demasiadas tentativas por agora, tente novamente mais tarde.";
    return "Erro no login: " + error.message;
  }

  function getRecoverPasswordError(error) {
    if (!error || !error.code) return "Erro ao enviar email: " + (error && error.message ? error.message : "");
    if (error.code === "auth/user-not-found") return "Não existe conta com este email.";
    if (error.code === "auth/invalid-email") return "O email informado é inválido.";
    if (error.code === "auth/missing-email") return "Digite um email para recuperar a senha.";
    return "Erro ao enviar email: " + error.message;
  }

  // --- Ações principais ---
  async function login() {
    try {
      showLoading();
      const email = form.email().value;
      const password = form.password().value;

      // compat API (firebase auth compat já carregado no HTML)
      await firebase.auth().signInWithEmailAndPassword(email, password);

      hideLoading();
      // redireciona para a home (sobe uma pasta porque estamos em /logs/)
      window.location.href = "../index.html";
    } catch (error) {
      hideLoading();
      alert(getLoginErrorMessage(error));
      console.error("Login error:", error);
    }
  }

  async function recoverPassword() {
    const email = form.email().value;
    if (!validateEmail(email)) {
      alert("Digite um e-mail válido para recuperar a senha.");
      return;
    }

    try {
      showLoading();
      await firebase.auth().sendPasswordResetEmail(email);
      hideLoading();
      alert("Um email de recuperação foi enviado para: " + email);
    } catch (error) {
      hideLoading();
      alert(getRecoverPasswordError(error));
      console.error("Recover password error:", error);
    }
  }

  // --- Eventos e inicialização ---
  function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErrors();
  }

  function onChangePassword() {
    toggleButtonDisable();
    togglePasswordErrors();
  }

  function attachListeners() {
    const emailEl = form.email();
    const passEl = form.password();
    const loginBtn = form.loginButton();
    const recoverBtn = form.recoverPassword();

    if (emailEl) {
      emailEl.addEventListener("input", onChangeEmail);
      emailEl.addEventListener("blur", onChangeEmail);
    }

    if (passEl) {
      passEl.addEventListener("input", onChangePassword);
      passEl.addEventListener("blur", onChangePassword);
    }

    // bind botões se quiseres usar addEventListener (o onclick inline também funciona)
    if (loginBtn) loginBtn.addEventListener("click", login);
    if (recoverBtn) recoverBtn.addEventListener("click", recoverPassword);
  }

  function hideAllErrorsInitially() {
    const els = [
      form.emailRequiredError(),
      form.emailValidError(),
      form.passwordRequiredError()
    ];
    els.forEach(el => { if (el) el.style.display = "none"; });
  }

  // Executa quando o DOM estiver pronto
  document.addEventListener("DOMContentLoaded", () => {
    // esconde erros e ajusta estado inicial
    hideAllErrorsInitially();
    attachListeners();
    toggleButtonDisable(); // garante estado correto do botão ao abrir a página
  });

  // exporta para global (opcional, se HTML usa onclick inline)
  window.login = login;
  window.recoverPassword = recoverPassword;
  window.onChangeEmail = onChangeEmail;
  window.onChangePassword = onChangePassword;
})();




//JS de login aintigo

/*
 function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErros();
}

 function onChangePassword(){
        toggleButtonDisable();
        togglePasswordErrors();
}

    function login() {
        showLoading();
        const email = form.email().value;
        const password = form.password().value;

        firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value)
            .then(() => {
                hideLoading();
                // REDIRECIONA PARA A HOME CORRETAMENTE
                window.location.href = "../index.html";
            })
            .catch(error => {
                hideLoading();
                alert(getErrorMessage(error));
                console.log("Erro:", error);
                //alert("Erro no login: " + error.message);
            });
    }



    function getErrorMessage(error){
        if (error.code == "auth/user-not-found"){
            return "Usuário não encontrado";
        }
        if (error.code == "auth/invalid-credential"){
            return "Senha incorreta";
        }
        return "Erro no login: " + error.message;
    }



    function getRecoverPasswordError(error) {
    if (error.code === "auth/user-not-found") {
        return "Não existe conta com este email.";
    }
    if (error.code === "auth/invalid-email") {
        return "O email informado é inválido.";
    }
    if (error.code === "auth/missing-email") {
        return "Digite um email para recuperar a senha.";
    }
    return "Erro ao enviar email: " + error.message;
    
}



    function register(){
        showLoading();
        window.location.href = "login.html";
        
    }

    function recoverPassword() {
    const email = form.email().value;

    if (!validateEmail(email)) {
        alert("Digite um e-mail válido para recuperar a senha.");
        return;
    }

    showLoading();

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            hideLoading();
            alert("Um email de recuperação foi enviado!");
        })
        .catch(error => {
            hideLoading();
            alert(getRecoverPasswordError(error));
        });
    }



    function isEmailValid(){
        const email = form.email().value;
        if(!email){
            return false;
        }
        return validateEmail(email);
    }
    //esta é a funcão que manda o aviso de erro se nao tiver email
    function toggleEmailErros() {
        const email = form.email().value;
        form.emailRequiredError().style.display = email ? "none" : "block";

        form.emailValidError().style.display = validateEmail(email) ? "none" : "block";
    }

    function togglePasswordErrors(){
        const password = form.password().value;


        form.passwordRequiredError().style.display = password ? "none" : "block";
    }

    function toggleButtonDisable(){
        
        const emailValid = isEmailValid();
        form.recoverPassword().disabled = !emailValid;

        const passwordValid = isPasswordValid();
        form.loginButton().disabled = !emailValid || !passwordValid;
    }

    function isPasswordValid(){
        const password = form.password().value;
        if (!password){
            return false;
        }
        return true;
    }

 const form = {
        email: () => document.getElementById("email"),
        emailValidError: () => document.getElementById('email-invalid-error'),
        emailRequiredError: () => document.getElementById('email-required-error'),
        loginButton: () => document.getElementById('login-button'),
        password: () => document.getElementById("password"),
        passwordRequiredError: () => document.getElementById('password-required-error'),
        recoverPassword: () => document.getElementById('recover-password-button')
}

*/