export default {
    localeIdentifier: "de_DE", // Locale code changed to "de_DE" for German (DE)
    documentTitle: "Wordle auf Deutsch: Errate das Wort", // Document title translated
    writtenName: "Wordle auf Deutsch", // Written name translated
    charSet: [
        'a', 'ä', 'b', 'c', 'ç', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'j', // Added German accented characters
        'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'q', 'r', 's', 'ß', 't', // Added German accented characters
        'u', 'ü', 'v', 'w', 'x', 'y', 'z'
    ], // Character set includes German accented characters
    langConvertMaps: {
            a:"ä",
            o:"ö",
            u:"ü",
            s:"SS"
    },
    wordMeaningQueryAPIURL: "https://dict.leo.org/german/definition/", // API URL changed to German dictionary
    titles_translations: { // Title translations
        score: "PUNKTESTAND", // Score translated
        toastMessages: [
            "Du musst mindestens",
            "Buchstaben eingeben, um zu raten!",
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
        shiftButtonMessages: ["Für deutsche Zeichen", "die Taste gedrückt halten.", "Drücken Sie die entsprechende DeutcheTaste, während Sie SHIFT gedrückt halten. Zum Beispiel: Für Ä drücken Sie A"],
        dialogBoxMessages:[
            "Schließen",
            "Bitte wähle eine Sprache für die Spieloberfläche und die Texte im Spiel aus.",
            "Sprache auswählen:",
            "Bitte wähle eine Sprache aus der folgenden Liste aus."
        ],
        largeMessageBoxMessages:["Bravvvoooooooooooooooo, sorulan kelimeyi buldunuz! Kelime: ","Oyun bitti! Maalesef kaybettiniz!. Sorulan kelime:"]
    }
}
