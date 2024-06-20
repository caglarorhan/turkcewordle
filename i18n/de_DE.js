export default {
    localeCode: "de_DE", // Locale code changed to "de_DE" for German (DE)
    name: "Wordle auf Deutsch", // Name changed to "Wordle auf Deutsch"
    documentTitle: "Wordle auf Deutsch: Errate das Wort", // Document title translated
    writtenName: "Wordle auf Deutsch", // Written name translated
    charSet: [
        'a', 'ä', 'b', 'c', 'ç', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'j', // Added German accented characters
        'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'q', 'r', 's', 'ß', 't', // Added German accented characters
        'u', 'ü', 'v', 'w', 'x', 'y', 'z'
    ], // Character set includes German accented characters
    langConvertMaps: {
        de: { // Language code changed to "de" for German
            u: 'ü', // 'ü' remains the same
            i: 'ï', // 'ï' added for German
            o: 'ö', // 'ö' translated to 'o'
            c: 'ç', // 'ç' remains the same
            s: 'ß', // 'ß' translated to 'ss'
            g: 'ğ', // 'ğ' translated to 'g'
            ä: 'ae', // 'ä' added for German
            ö: 'oe', // 'ö' added for German
            ü: 'ue', // 'ü' added for German
        }
    },
    wordMeaningQueryAPIURL: "https://dict.leo.org/german/definition/", // API URL changed to German dictionary
    titles_translations: { // Title translations
        score: "PUNKTESTAND", // Score translated
        toastMessages: [
            "Du musst mindestens 5 Buchstaben eingeben, um zu raten!", // Toast messages translated
            "Herzlichen Glückwunsch! Du hast das versteckte Wort gefunden!",
            "Dieses Wort ist nicht im Wörterbuch enthalten!",
            "Es wurden keine Nachrichten gefunden!",
        ],
        infoBoxMessages: [ // Info box messages translated
            "Richtiger Buchstabe, richtige Position",
            "Richtiger Buchstabe, falsche Position",
            "Falscher Buchstabe",
            "Programmiert von:",
            "Um mich zu unterstützen:",
            "Spenden Sie über PayPal",
            "Bestellen Sie mir einen Kaffee auf BuyMeACoffee ;)",
            "Neues Spiel starten",
        ],
        shiftButtonMessages: ["Halten Sie die Taste gedrückt für deutsche Zeichen.", // Shift button messages translated
            "Drücken Sie die entsprechende Taste in Englisch, während Sie die Umschalttaste gedrückt halten. Beispiel: Drücken Sie G für Ğ, S für Ş"]
    }
}
