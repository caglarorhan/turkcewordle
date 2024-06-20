export default {
    localeCode: "ms_MY", // Locale code changed to "ms_MY" for Malay
    name: "Wordle dalam Bahasa Melayu", // Name changed to "Wordle dalam Bahasa Melayu"
    documentTitle: "Wordle dalam Bahasa Melayu: Tebak Kata", // Document title translated
    writtenName: "Wordle dalam Bahasa Melayu", // Written name translated
    charSet: [
        'a', 'b', 'c', 'ç', 'd', 'e',
        'f', 'g', 'ğ', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'ö',
        'p', 'q', 'r', 's', 'ş', 't',
        'u', 'ü', 'v', 'w', 'x', 'y',
        'z'
    ], // Character set includes additional Malay characters
    langConvertMaps: {
        ms: { // Language code changed to "ms" for Malay
            u: ['ü','ú' ], // 'ü' remains the same
            o: ['ö','ó'], // 'ö' translated to 'o'
            c: 'ç', // 'ç' remains the same
            s: 'ş', // 'ş' translated to 's'
            g: 'ğ', // 'ğ' translated to 'g'
            a: 'å', // 'å' added for Malay
            e: 'é', // 'é' added for Malay
            i: 'í', // 'í' added for Malay
        }
    },
    wordMeaningQueryAPIURL: "https://glosbe.com/ms/id/kata", // API URL changed to Malay dictionary
    titles_translations: { // Title translations
        score: "SKOR", // Score translated
        toastMessages: [
            "Anda perlu memasukkan sekurang-kurangnya 5 huruf untuk meneka!", // Toast messages translated
            "Tahniah! Anda telah menemui perkataan tersembunyi!",
            "Perkataan ini tidak terdapat dalam kamus!",
            "Tiada mesej ditemui!",
        ],
        infoBoxMessages: [ // Info box messages translated
            "huruf yang betul, kedudukan yang betul",
            "huruf yang betul, kedudukan yang salah",
            "huruf yang salah",
            "Dikodkan oleh:",
            "Untuk menyokong saya:",
            "Dermakan melalui PayPal",
            "Belikan saya kopi di BuyMeACoffee ;)",
            "Mulakan Permainan Baru",
        ],
        shiftButtonMessages: ["Tekan dan tahan untuk aksara Bahasa Melayu.", // Shift button messages translated
            "Tekan setara Bahasa Inggeris sambil menekan kekunci SHIFT. Contoh: Tekan G untuk Ğ, S untuk Ş"]
    }
}
