// Usuario continua logado
firebase.auth().onAuthStateChanged(user => {
  if (user){
    // Já está logado → manda direto para HOME
    window.location.href = "../index.html";
  }
});

// Validação de registro
function onChangeEmail() {
    const email = form.email().value;

    form.emaiRequiredError().style.display = email ? "none" : "block";
    form.emaiInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;

    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordMatch();
    toggleRegisterButtonDisable();
}

function validatePasswordMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password === confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password !== confirmPassword) {
        return false;
    }

    

    return true;
}

// Registro no Firebase
function register() {
    showLoading();

    const username = document.getElementById("username").value;
    const email = form.email().value;
    const password = form.password().value;

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Atualizar o nome no perfil
            return user.updateProfile({ displayName: username })
                .then(() => {
                    // Forçar recarregar os dados do user
                    return user.reload();
                })
                .then(() => {
                    // Salvar no Firestore
                    return firebase.firestore()
                        .collection("users")
                        .doc(user.uid)
                        .set({
                            username: username,
                            email: email,
                            createdAt: new Date()
                        });
                });
        })
        .then(() => {
            hideLoading();
            alert("Conta criada com sucesso!");
            window.location.href = "../index.html";
        })
        .catch((error) => {
            hideLoading();
            alert(getErrorMessage(error));
        });
}




function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use"){
        return "Email já está em uso";
    }
    return error.message;
}

// IDs dos htmls
const form = {
    confirmPassword: () => document.getElementById("confirmPassword"),
    confirmPasswordDoesntMatchError: () => document.getElementById("password-doesnt-match-error"),

    email: () => document.getElementById("email"),
    emaiInvalidError: () => document.getElementById("email-invalid-error"),
    emaiRequiredError: () => document.getElementById("email-required-error"),

    password: () => document.getElementById("password"),
    passwordMinLengthError: () => document.getElementById("password-min-lenght-error"),
    passwordRequiredError: () => document.getElementById("password-required-error"),

    registerButton: () => document.getElementById("register-button"),
};
