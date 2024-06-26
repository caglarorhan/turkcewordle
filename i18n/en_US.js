export default {
    localeIdentifier: "en_US", // Locale code changed to "en" for English (US)
    documentTitle: "English Wordle: Guess the English Word", // Document title translated
    writtenName: "English Wordle", // Written name translated
    charSet: [
        'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'
    ], // Character set remains the same
    langConvertMaps: {},
    wordMeaningQueryAPIURL: null,
    ariaLabels:["Character of this key is: ","Delete last character","Try this word"],
    titles_translations: { // Title translations
        score: "SCORE", // Score translated
        toastMessages: [
            "You must enter at least",
            "letters to guess!", // Toast messages translated
            "Congratulations! You found the hidden word!",
            "This word is not found in the dictionary!",
            "No messages found!",
        ],
        infoBoxMessages: [ // Info box messages translated
            "correct letter, correct position",
            "correct letter, wrong position",
            "wrong letter",
            "Coded by:",
            "To support me:",
            "Donate via PayPal",
            "Buy me a coffee on BuyMeACoffee ;)",
            "Start New Game",
        ],
        shiftButtonMessages: ["Hold down the."," button for English characters",
            "ENGLISH characters does not need to hold SHIFT."],
        dialogBoxMessages:[
            "Close",
            "Please select a language for the game interface and words in the game.",
            "Select a language:",
            "Please select a language from below",
        ],
        largeMessageBoxMessages:["Bravvvoooooooooooooooo, you found the word! Word is: ","Game finished! Unfortunately you lost! The word was:"]
    }
}
