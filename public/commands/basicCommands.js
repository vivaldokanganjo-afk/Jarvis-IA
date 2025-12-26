const sinonimos = {
    horas: ["que horas são", "hora atual"],
    data: ["que dia é hoje", "data de hoje"],
    fuso: ["fuso horário", "meu fuso"]
};

export function responderComandoBasico(texto) {
    const t = texto.toLowerCase();

    if (sinonimos.horas.some(p => t.includes(p))) {
        return `Agora são ${new Date().toLocaleTimeString()}`;
    }

    if (sinonimos.data.some(p => t.includes(p))) {
        return `Hoje é ${new Date().toLocaleDateString()}`;
    }

    if (sinonimos.fuso.some(p => t.includes(p))) {
        return `Seu fuso horário é ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    }

    return null;
}
                                                                                                                                                                                              