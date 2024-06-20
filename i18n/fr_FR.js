export default {
    localeCode: "es_ES", // Locale code changed to "es_ES" for Spanish (ES)
    name: "Wordle en Español", // Name changed to "Wordle en Español"
    documentTitle: "Wordle en Español: Adivina la palabra", // Document title translated
    writtenName: "Wordle en Español", // Written name translated
    charSet: [
        'a', 'á', 'b', 'c', 'ç', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í', // Added Spanish accented characters
        'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'ó', 'p', 'q', 'r', 's', // Added Spanish accented characters
        'ş', 't', 'u', 'ú', 'v', 'w', 'x', 'y', 'z'
    ], // Character set includes Spanish accented characters
    langConvertMaps: {
        es: { // Language code changed to "es" for Spanish
            u: 'ü', // 'ü' remains the same
            i: 'ï', // 'ï' added for Spanish
            o: 'ö', // 'ö' translated to 'o'
            c: 'ç', // 'ç' remains the same
            s: 'ş', // 'ş' translated to 's'
            g: 'ğ', // 'ğ' translated to 'g'
            á: 'aa', // 'á' added for Spanish
            é: 'ee', // 'é' added for Spanish
            í: 'ii', // 'í' added for Spanish
            ó: 'oo', // 'ó' added for Spanish
            ú: 'uu', // 'ú' added for Spanish
        }
    },
    wordMeaningQueryAPIURL: "https://fr.wiktionary.org/wiki/Annexe:Wiktionnaire:Dictionnaires_de_langue", // API URL changed to French dictionary
    titles_translations: { // Title translations
        score: "SCORE", // Score translated
        toastMessages: [
            "Vous devez saisir au moins 5 lettres pour deviner !", // Toast messages translated
            "Félicitations ! Vous avez trouvé le mot caché !",
            "Ce mot n'est pas trouvé dans le dictionnaire !",
            "Aucun message trouvé !",
        ],
        infoBoxMessages: [ // Info box messages translated
            "lettre correcte, position correcte",
            "lettre correcte, mauvaise position",
            "lettre incorrecte",
            "Codé par :",
            "Pour me soutenir :",
            "Faites un don via PayPal",
            "Offrez-moi un café sur BuyMeACoffee ;)",
            "Commencer un nouveau jeu",
        ],
        shiftButtonMessages: ["Appuyez et maintenez pour les caractères français.", // Shift button messages translated
            "Appuyez sur l'équivalent anglais tout en maintenant la touche SHIFT enfoncée. Exemple : Appuyez sur G pour Ğ, S pour Ş"]
    }
}
