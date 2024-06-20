export default {
    localeCode:"tr",
    name: "TurkceWordle",
    documentTitle:"Türkçe Wordle: Türkçe Kelime Tahmin Oyunu",
    writtenName:"Türkçe Wordle",
    charSet:[
        'a', 'b', 'c', 'ç', 'd', 'e',
        'f', 'g', 'ğ', 'h', 'ı', 'i',
        'j', 'k', 'l', 'm', 'n', 'o',
        'ö', 'p', 'r', 's', 'ş', 't',
        'u', 'ü', 'v', 'y', 'z'
    ],
    langConvertMaps: {u: 'ü', i: 'i', o: 'ö', c: 'ç', s: 'ş', g: 'ğ'},
    wordMeaningQueryAPIURL:"https://sozluk.gov.tr/gts?ara=",
    titles_translations:{
        score: "SKOR",
        toastMessages:[
            "Tahmin icin en az",
            "harf girmelisiniz!",
            "Bravo saklanan  kelimeyi buldunuz!",
            "Bu kelime sozlukte yer almiyor!",
            "Herhangi bir mesaj bulunamadi!",
        ],
        infoBoxMessages:[
            "doğru harf, doğru yerde",
            "doğru harf, yanlış yerde",
            "yanlış harf",
            "Kodlayan:",
            "Beni desteklemek icin:",
            "PayPal uzerinden bagis yapin",
            "BuyMeACoffee dan bana bir kahve ismarlayin ;)",
            "Yeni Oyun Baslat",
        ],
        shiftButtonMessages:["Turkce karakterler icin","tusuna basili tutun.","SHIFT basikken ENG benzerine basin. Ornegin: Ğ icin G'ye basin, Ş icin S'ye"]
    }
}
