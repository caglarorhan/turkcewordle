# Turkish Wordle - A Word Guess Game
**[Türkçe Wordle](https://caglarorhan.github.io/turkcewordle/) - Bir Türkçe Kelime Tahmin Oyunu**

## Overview

Turkish Word Guess Game is a fun and educational game inspired by the popular Wordle. This game challenges players to guess a hidden Turkish word within a limited number of attempts. It's an engaging way to improve vocabulary and language skills while having fun.

Multi-language support added. You can play the game in English, Spanish, German and Turkish. You can add your own language support by following the instructions below.  [i18n Support and Contribution section](#i18n-support-and-contribution). 

![Game Screenshot](/screenshots/emptygameboard.JPG)
![Game Screenshot](/screenshots/filledgameboard.JPG)
![Game Screenshot](/screenshots/game_information.JPG)
![Game Screenshot](/screenshots/shiftkeypressed.JPG)
![Game Screenshot](/screenshots/warningtoastmessage.JPG)
![Game Screenshot](/screenshots/warningtoastmessage_2.JPG)
![Game Screenshot](/screenshots/warningtoastmessage_3.JPG)


## Features

- Simple and intuitive gameplay
- Turkish 5 letter words for enhanced language learning
- Responsive design for various screen sizes
- Score tracking to challenge yourself and friends
- Open-source and customizable for developers

## Getting Started

To play the game, simply visit the [live demo](https://caglarorhan.github.io/turkcewordle/) or follow these steps to run it locally:

1. Clone this repository to your local machine.
2. Open `index.html` in your web browser.
3. Start guessing Turkish words and have fun!

## Usage

- Guess a word: Enter your guess into the input field and submit (enter).
- Feedback: You will receive feedback on each letter's correctness (color codes).
- Guess wisely: You have a limited number of attempts to guess the word correctly.
- Win: Guess the word within the given attempts to win the game!

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/improvement`).
5. Create a new Pull Request.

## i18n Support and Contribution

If you would like to contribute to the game by adding support for additional languages, you can follow these steps:
There are two files to change the language of the game. Firs one is a dictionary file paced in the **dictionaries** folder. 
Second file is a translation file for titles and messages on the game. This translation file is places in the **i18n** folder.
Both of these file's names are language and country code's short form. For example, for English, it is en_US. For Turkish, it is tr_TR. For Spanish is es_ES. Both files are importing to the main index.js file dynamically.
Last step is to add your language and codes to the **language_list.js** file which sits in the root folder.

Sample file structure:

`
export const  languages = [
            {localeCode: "tr_TR", name:"Türkçe"},
            {localeCode: "en_US", name:"English"},
            {localeCode: "de_DE", name:"Deutsch"},
            {localeCode: "es_ES", name:"Español"},
]
`

### Dictionary File
This file includes an Array and export it as constant name _**dictionary**_ . The only changing parts are the words inside the array. This array is standard javascript array. Comma separated double-quoted strings.

Sample structure: 

`export const dictionary = ["abacı", "abadi"]`


### Translation File
This file is a javascript object. It includes key-value pairs. Key is the name of the message or title. Value is the translation of the message or title. Please choose the English one (en_US.js) and translate as is to your language. 
When translating understand the charSet of the target language and similar letter shift options (if the target language has ones). Checkout **langConvertMaps** key.
`

    langConvertMaps: {
            n:"ñ",
            a:"á",
            e:"é",
            i:"í",
            o:"ó",
            u:"ú"
    },
`

For example Spanish has "n" and "ñ" letters which looks similar. Shit option is for users whom use their own keywboards that doesn't support these language specific letters.
Just watch out the order of the messages. It should be the same as the English one. 

Sample general structure:

    localeIdentifier: "en_US", // Locale code changed to "en" for English (US)
    documentTitle: "English Wordle: Guess the English Word", // Document title translated
    writtenName: "English Wordle", // Written name translated
    charSet: [
        'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'
    ],`
`


## Credits

This game was created by **Caglar Orhan** and is licensed under the [MIT License](LICENSE).

## License

Turkish Word Guess Game is open-source and licensed under the [MIT License](LICENSE).

---

## For Developers

### Technical Overview

The game is built using HTML, CSS, and JavaScript. Here's a brief overview of the project structure:

- `index.html`: Main HTML file containing main html skeleton and files
- `/css/index.css`: CSS file for styling the game elements.
- `/js/index.js`: JavaScript file containing the game logic and functionality.
- `/js/dictionary.js`: JavaScript file containing the word list for the game as an Array.
- `/img/`: Directory containing images and assets used in the game.
- `/css/materialize.min.css`: Materialize minimized style file.
- `/js/materialize.min.js`: Materialize minimized javascript file.
- `manifest.json`: Web app manifest to install the game as PWA.
- `/screenshots`: Screenshots of the game for the README file.
- `README.md`: Project overview and instructions for users and developers.
- `LICENSE.txt`: License file for the project.

### Development Setup

To set up the development environment and make changes to the game, follow these steps:

1. Clone the repository to your local machine.
2. Make changes to the HTML, CSS, or JavaScript files as needed.
3. Test your changes locally by opening `index.html` in a web browser.
4. Make sure to handle any dependencies or external libraries used in the game.

### Customization

You can customize various aspects of the game, such as word lists and styling. Here are some tips for customization:

- Word Lists: Update the `/js/dictionary.js` file to include your own Turkish word list.
- Styling: Modify the CSS file (`index.css`) to change the game's appearance and layout.

### Dependencies

The game currently does not have any external dependencies and can run standalone in any modern web browser.

### Testing

You can perform manual testing by playing the game and verifying its behavior. Additionally, consider implementing automated tests using frameworks like Jasmine or Mocha. Unit tests will be added sooner.

### Deployment

To deploy the game to a web server or hosting platform, simply upload the files to the desired location. Ensure that all necessary files, including HTML, CSS, JavaScript, and any additional assets, are included in the deployment.

### Future Improvements

There are several potential areas for improvement and future features to enhance the game:

- Multiplayer mode: Add support for multiplayer gameplay, allowing users to compete against each other.
- Localization: Extend language support beyond Turkish to reach a broader audience.
- Accessibility: Improve accessibility features to ensure the game is usable for all players, including those with disabilities.
- Performance optimization: Optimize code and assets to improve loading times and overall performance.
- Community contributions: Encourage community contributions by providing clear guidelines and documentation for developers.

## Support

If you find this project helpful or enjoyable, you can support its development by [buying me a coffee](https://www.buymeacoffee.com/caglarorhan) ☕️ or donating through [PayPal](https://paypal.me/caglarorhan?country.x=US&locale.x=en_US) .

[<img src="./paypal-mark-color.svg" alt="Donating through PayPal" width="20" height="20" />](https://paypal.me/caglarorhan?country.x=US&locale.x=en_US "PayPal")


[<img src="./bmc-icon.svg" alt="Donating through BuyMeACoffee" width="20" height="20" />](https://www.buymeacoffee.com/caglarorhan "Buy Me A Coffee")

## Feedback
For any questions, issues, or feedback, please [open an issue](../../issues) on GitHub. Your input is valuable and helps improve the game for everyone!



