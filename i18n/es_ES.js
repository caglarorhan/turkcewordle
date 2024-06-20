export default {
    localeCode: "es", // Locale code changed to "es_ES" for Spanish (ES)
    name: "Wordle en Español", // Name changed to "Wordle en Español"
    documentTitle: "Wordle en Español: Adivina la palabra", // Document title translated
    writtenName: "Wordle en Español", // Written name translated
    charSet: [
        'a', 'á', 'b', 'c', 'ç', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í', // Added Spanish accented characters
        'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'ó', 'p', 'q', 'r', 's', // Added Spanish accented characters
        'ş', 't', 'u', 'ú', 'v', 'w', 'x', 'y', 'z'
    ], // Character set includes Spanish accented characters
    langConvertMaps: {
            n:"ñ"
    },
    wordMeaningQueryAPIURL: "https://dle.rae.es/?w=", // API URL changed to Spanish dictionary
    titles_translations: { // Title translations
        score: "PUNTUACIÓN", // Score translated
        toastMessages: [
            "¡Debes ingresar al menos 5 letras para adivinar!", // Toast messages translated
            "¡Felicidades! ¡Has encontrado la palabra oculta!",
            "¡Esta palabra no se encuentra en el diccionario!",
            "¡No se encontraron mensajes!",
        ],
        infoBoxMessages: [ // Info box messages translated
            "letra correcta, posición correcta",
            "letra correcta, posición incorrecta",
            "letra incorrecta",
            "Codificado por:",
            "Para apoyarme:",
            "Dona a través de PayPal",
            "Cómprame un café en BuyMeACoffee ;)",
            "Iniciar nuevo juego",
        ],
        shiftButtonMessages: ["Mantén presionado ", "para caracteres en español.",
            "Presiona la tecla equivalente en inglés mientras presionas SHIFT. Ejemplo: Presiona G para Ğ, S para Ş"]
    }
}
