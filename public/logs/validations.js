function validateEmail(email) {
    // validação correta, estável e compatível com Firebase
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
