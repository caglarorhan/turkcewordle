//document.body.innerHTML='';
const vSW = {
    version:'2024.1.0',
    author:'https://github.com/caglarorhan',
    name:`WorldsWordle`,
    defaultLanguage: "en_US",
    languageList:[{localeCode: "en_US", name:"English"}],
    dictionary:[],
    askedWordIndex:null,
    isSHIFTPressed:false,
    deferredPrompt: null,
    meaningsOfWords:Object.create(null),
    init: async () => {
        if( vSW.isLanguageSelected()){
            await vSW.importLanguageFiles();
        }else{
            await vSW.importLanguageFiles();
            vSW.openLanguageSelectionDialog();
        }


        vSW.gameBoard.create()
            .then(() => {
                vSW.keyBoard.create().then(() => {
                    vSW.keyBoard.setKeys();
                })
                vSW.gameBoard.setBoard();
                vSW.largeMessageBox.create();
                vSW.gameBoard.showInfo(vSW.titles_translations.score,JSON.parse(window.localStorage.getItem(vSW.name)).score);
            })
    },
    isLanguageSelected:()=>{
        return localStorage.getItem("selectedLanguage") && localStorage.getItem("selectedLanguage")!=="undefined"
    },
    selectLanguage:async (languageLocale)=>{
        localStorage.setItem("selectedLanguage", languageLocale);
       await vSW.importLanguageFiles();
    },
    importLanguageFiles: async ()=>{
        let selectedLanguage = localStorage.getItem("selectedLanguage");
        if(!selectedLanguage || selectedLanguage==="undefined"){
            await vSW.selectLanguage(vSW.defaultLanguage);
            selectedLanguage = vSW.defaultLanguage;
        }

        vSW.localeCode = selectedLanguage.split("_")[0];
       await  import(`../i18n/${selectedLanguage}.js`)
            .then( async (module)=>{
            await vSW.loadVariablesFromLanguageFile(module);
            //await vSW.gameBoard.reset();
        })
            .catch(error=>{
                console.log(error);
            })
       await import(`../dictionaries/${selectedLanguage}.js`)
            .then(module => {
                vSW.dictionary = module.dictionary;
                vSW.gameBoard.reset();
            })
            .catch(error => {
                console.error(error);
            });
       await import(`../language_list.js`)
           .then((module) => {
           vSW.languageList = module.languages;
       }).catch(error => {
           console.log(error);
       })
    },
    loadVariablesFromLanguageFile: (module)=>{
        Object.entries(module.default).forEach(([k,v])=>{
                vSW[k] = v;
        })
        // console.log(vSW);
        // console.log('Degiskenler set edildi!')
    },
    openLanguageSelectionDialog:()=>{
        if(!document.getElementById('languageSelectionDialog')){
            let newDialog = document.createElement('dialog');
            newDialog.id = "languageSelectionDialog";
            let messages=[];
            if(!vSW?.titles_translations?.dialogBoxMessages){
                messages = [
                    "Close",
                    "Please select a language for the game interface and words in the game.",
                    "Select a language:",
                    "Please select a language from below",
                ]
            }else{
                messages = vSW.titles_translations.dialogBoxMessages;
            }

            let languageOptions = vSW.languageList.reduce((acc, language) => {
                return acc + `<option value="${language.localeCode}">${language.name}</option>`;
            }, "");

            newDialog.innerHTML = `
                                                    <button autofocus id="dialogCloseButton">${messages[0]}</button>
                                                    <p>${messages[1]}</p>
                                                    <div>
                                                    <label for="langSelection">${messages[2]}</label>
                                                    <select name="langSelection" id="langSelection">
                                                        <option >${messages[3]}</option>
                                                        ${languageOptions}
                                                    </select>
                                                    </div>

                                                    `;
            document.body.appendChild(newDialog);
            document.querySelector("#dialogCloseButton").addEventListener("click",()=>{
                newDialog.close();
            })

            document.querySelector("#langSelection").addEventListener("change",()=>{
                if(document.querySelector("#langSelection").value){
                    vSW.selectLanguage(document.querySelector("#langSelection").value);
                    console.log('Dil secildi simdi oyun UI in  resetlenmesi gerekiyor.')
                    newDialog.close();
                    window.location.reload();
                }

            })

        }
        document.getElementById('languageSelectionDialog').showModal();
    },
    getRandomWordIndexFromDictionary: ()=>{
        return Math.floor(Math.random()*(vSW.dictionary.length-1));
    },
    gameBoard: {
        rowCount: 6,
        colCount: 5,
        guessedWords: [],
        create: () => {
            let gameBoard = document.createElement('div');
            gameBoard.id = vSW.name;
            gameBoard.classList.add("game-board");
            return new Promise((resolve, reject) => {
                document.body.appendChild(gameBoard);
                resolve(gameBoard);
            });
        },
        reset:()=>{
            vSW.gameBoard.guessedWords=[];
            vSW.askedWordIndex = vSW.getRandomWordIndexFromDictionary();
            let theInputs = document.querySelectorAll(`#${vSW.name} input`);
            theInputs.forEach(i=>{
                i.value='';
                i.classList.remove(...i.classList)
                i.classList.add("letterInput");
                delete i.dataset.correctLetterCorrectPlace;
            });
            document.querySelectorAll( `#${vSW.name}-keyboard button`).forEach(btn=>{
                btn.disabled=false;
                if(!btn.id.includes('enter-button') &&  !btn.id.includes('delete-button')){
                    btn.classList.remove(...btn.classList)
                    btn.classList.add("keyboard-button");
                }
            })
        },
        setBoard: () => {
            for (let row = 0; row < vSW.gameBoard.rowCount; row++) {
                let rowDiv = document.createElement('div');
                rowDiv.classList.add("game-board-row");
                rowDiv.dataset.divType="rows";
                rowDiv.dataset.rowNo=''+row;
                for (let col = 0; col < vSW.gameBoard.colCount; col++) {
                    let colDiv = document.createElement('div');
                    colDiv.classList.add("game-board-col");
                    colDiv.dataset.divType="cols";
                    colDiv.dataset.colNo=''+col;
                    rowDiv.appendChild(colDiv);
                    let letterInput = document.createElement('input');
                    letterInput.classList.add("letterInput");
                    letterInput.setAttribute('maxlength', "1");
                    letterInput.setAttribute('readonly', "readonly");
                    colDiv.appendChild(letterInput);
                }
                rowDiv.addEventListener('mouseover',(event)=>{
                    let srcItem = event.target;
                    if(srcItem.dataset.divType==="cols"){
                        srcItem=srcItem.parentNode;
                    }
                    if(vSW.gameBoard.guessedWords[parseInt(srcItem.dataset.rowNo)]){
                        let focusedGuessedWord = vSW.gameBoard.guessedWords[parseInt(srcItem.dataset.rowNo)].join('');
                        if(focusedGuessedWord.length>0 && vSW.dictionary.includes(focusedGuessedWord)){
                        }
                    }
                })
                document.getElementById(vSW.name).appendChild(rowDiv);
            }
            // data created at localStorage
            let data=Object.create(null);
            let score = Object.create(null);
            for(let x = 1; x<=vSW.gameBoard.colCount;x++){
                score[x]=0;
            }
            score["fail"]=0;
            data.score=score;
            if(!window.localStorage.getItem(vSW.name)){
                window.localStorage.setItem(vSW.name,JSON.stringify(data))
            }
        },
        addChar: (char) => {
            let newLetterIndex;
            let lastGuessedWordIndex = vSW.gameBoard.guessedWords.length - 1;
            if (!vSW.gameBoard.guessedWords.length) {
                let newWord = [];
                newWord.push(char);
                vSW.gameBoard.guessedWords.push(newWord);
                newLetterIndex=0;
            } else {
                if (vSW.gameBoard.guessedWords[lastGuessedWordIndex].length < vSW.gameBoard.colCount) {
                    vSW.gameBoard.guessedWords[lastGuessedWordIndex].push(char);
                    newLetterIndex = vSW.gameBoard.guessedWords[lastGuessedWordIndex].length - 1;
                }else{
                    return;
                }
            }

            let inputIndex = (vSW.gameBoard.guessedWords.length-1) * vSW.gameBoard.colCount + newLetterIndex;

            let theInputs = document.querySelectorAll(`#${vSW.name} input`);
            let newInput = theInputs[inputIndex];
            let parentDiv = newInput.parentElement;

            parentDiv.classList.add('flip-animation');

            setTimeout(() => {
                parentDiv.classList.remove('flip-animation');
            }, 1000);

            newInput.value = char.toLocaleUpperCase(vSW.localeCode);

        },
        placeWordsToBoard: () => {
            let theInputs = document.querySelectorAll(`#${vSW.name} input`);
          //document.querySelectorAll('.flip-animation').forEach(pDiv=>pDiv.classList.remove('flip-animation'));
            theInputs.forEach(i=>{
                i.value='';
            });
            let askedWord = vSW.dictionary[vSW.askedWordIndex];
            //console.log(askedWord);
            for (let x = 0; x < vSW.gameBoard.guessedWords.length; x++) {
                for(let y=0; y<vSW.gameBoard.guessedWords[x].length;y++){
                    let targetLetterFromGuessedWord = vSW.gameBoard.guessedWords[x][y];
                    //console.log(`All guessed words: ${vSW.gameBoard.guessedWords}`);
                    //console.log(`TargetLetterFromGuessedWord: ${targetLetterFromGuessedWord}`);
                    let inputIndex = (x*vSW.gameBoard.colCount)+y;
                    theInputs[inputIndex].value=targetLetterFromGuessedWord.toLocaleUpperCase(vSW.localeCode);
                }
            }

           // TODO: Buraya animasyon koyulacak
        },
        checkEnteredWord: ()=>{
            let theInputs = document.querySelectorAll(`#${vSW.name} input`);
            if(vSW.gameBoard.guessedWords.length===0) return;
            let guessedWordsLength = vSW.gameBoard.guessedWords.length;
            let lastEnteredWord = vSW.gameBoard.guessedWords[guessedWordsLength-1];
            let askedWord = vSW.dictionary[vSW.askedWordIndex];
            let askedWordLettersArray = askedWord.split('');
            // console.log(askedWord);
            // console.log(JSON.stringify(vSW.gameBoard.guessedWords))

            // convert input to lowerCase but locale
            lastEnteredWord = lastEnteredWord.map(letter=>letter.toLocaleLowerCase(vSW.localeCode));

            if(lastEnteredWord.length!==vSW.gameBoard.colCount){
                //vSW.gameBoard.guessedWords.forEach(word=>console.log(word));
                console.log(lastEnteredWord.length,vSW.gameBoard.colCount)
                vSW.toastMessages({message:`${vSW.titles_translations.toastMessages[0]} ${vSW.gameBoard.colCount} ${vSW.titles_translations.toastMessages[1]}`, time:3, type:"info"});
                return;
            }
            if(lastEnteredWord.length===vSW.gameBoard.colCount){
                // letterCountMap
                let letterCountMap =Object.create(null);
                askedWordLettersArray.forEach(letter=>{
                    letterCountMap[letter]=++letterCountMap[letter] || 1;
                })
                // console.log(JSON.stringify(letterCountMap))
                // if word has already on the board

                //if word guessed correctly
                if(lastEnteredWord.join('')===askedWord){
                    vSW.gameBoard.endGame({didWin:true, message:`${vSW.titles_translations.largeMessageBoxMessages[0]} <span class="askedWord">${askedWord}</span>!`});

                   // vSW.largeMessageBox.showMessage({html:vSW.titles_translations.toastMessages[2], timeout:5})

                }else{
                    if(vSW.dictionary.includes(lastEnteredWord.join(''))){

                        //vSW.getTheMeaning(lastEnteredWord.join(''));
                        let newWord = [];
                        vSW.gameBoard.guessedWords.push(newWord);
                    }else{
                        vSW.toastMessages({message:vSW.titles_translations.toastMessages[3], time:3, type:"warning"});
                        return;
                    }

                }

                //coloring hints created
                // first correct position correct letter
                for(let x=0; x<vSW.gameBoard.colCount;x++) {
                    let inputIndex = ((guessedWordsLength - 1) * vSW.gameBoard.colCount) + (x);
                    if (lastEnteredWord[x] === askedWordLettersArray[x]) {
                        // letter and its position are correct.
                        theInputs[inputIndex].classList.add("correctLetterCorrectPlace");
                        theInputs[inputIndex].dataset.correctLetterCorrectPlace="1_1";
                        letterCountMap[lastEnteredWord[x]]--;
                        vSW.gameBoard.keyboardKeyAddClass(lastEnteredWord[x],"keyboard-button-correct-letter-correct-place");
                    }
                }
                // second other positions for correct-wrong letters
                for(let x=0; x<vSW.gameBoard.colCount;x++){
                    let inputIndex = ((guessedWordsLength-1)*vSW.gameBoard.colCount)+(x);
                    if(askedWordLettersArray.includes(lastEnteredWord[x])){
                        // letter is correct but its position is wrong
                        if(letterCountMap[lastEnteredWord[x]]>0 && theInputs[inputIndex].dataset.correctLetterCorrectPlace!=="1_1"){
                            theInputs[inputIndex].classList.add("correctLetterWrongPlace");
                            theInputs[inputIndex].dataset.correctLetterCorrectPlace="1_0";
                            letterCountMap[lastEnteredWord[x]]--;
                        }else if(theInputs[inputIndex].dataset.correctLetterCorrectPlace!=="1_1"){
                            theInputs[inputIndex].dataset.correctLetterCorrectPlace="0_0";
                            theInputs[inputIndex].classList.add("wrongLetter");
                        }
                        vSW.gameBoard.keyboardKeyAddClass(lastEnteredWord[x],"keyboard-button-correct-letter-correct-place");
                    }else{
                        // letter is wrong
                        theInputs[inputIndex].classList.add("wrongLetter");
                        theInputs[inputIndex].dataset.correctLetterCorrectPlace="0_0";
                        vSW.gameBoard.keyboardKeyAddClass(lastEnteredWord[x],"keyboard-button-wrong-letter");
                    }
                }
            }
            if (vSW.gameBoard.guessedWords.length-1 === vSW.gameBoard.rowCount) {
                let askedWord = vSW.dictionary[vSW.askedWordIndex];
                vSW.gameBoard.endGame({didWin:false, message:`
                ${vSW.titles_translations.largeMessageBoxMessages[1]} <span class="askedWord">${askedWord}</span>!
                `});
               // vSW.largeMessageBox.showMessage({html:`Bravo kelimeyi buldunuz!`, timeout:5})
                //document.querySelector(".infoBox").classList.remove("hidden");
            }
        },
        keyboardKeyAddClass:(letter,newClassName, oldClassName)=>{
            letter = letter.toLocaleUpperCase(vSW.localeCode);
                document.querySelector(`#${vSW.name}-keyboard button[data-letter-value='${letter}']`).classList.add(newClassName);
        },
        endGame: async (data={didWin:false, message:vSW.titles_translations.toastMessages[4]})=>{
            let playedGameLogs=JSON.parse(window.localStorage.getItem(vSW.name));
            let messageType = 'large_success';


            if(data.didWin){
                playedGameLogs.score[(vSW.gameBoard.guessedWords.length)]+=1
                window.localStorage.setItem(vSW.name,JSON.stringify(playedGameLogs))
                setTimeout(vSW.gameBoard.reset,2000);
            }else{
                messageType= 'large_fail';
                playedGameLogs.score["fail"]+=1
                window.localStorage.setItem(vSW.name,JSON.stringify(playedGameLogs))
                setTimeout(vSW.gameBoard.reset,2000);
            }

            await vSW.toastMessages({message:data.message.toString(), time:5, type:messageType});
            setTimeout(
                 ()=>{
            document.querySelector(".infoBox").classList.remove("hidden");
                    vSW.gameBoard.showInfo(vSW.titles_translations.score,JSON.parse(window.localStorage.getItem(vSW.name)).score);
               },5
            )

            document.querySelectorAll( `#${vSW.name}-keyboard button`).forEach(btn=>btn.setAttribute('disabled','disabled'));
            //console.log(`Kayit sonrasi data: ${JSON.stringify(playedGameLogs)}`);

            // TODO: enter ve backspace tuslari double size dan normale donuyor onu duzeltelim

            // TODO: Oyin kaybedildiyse saklanmis kelimeyi daha bariz gosterebiliriz.

            // TODO: Oyun kazanildiysa gameboard alaninda konfeti atilabilir ve bilinen kelime bariz gosterilebilir.

        },
        showInfo:(header="Header",data)=>{
            let infoBox;
            if(document.getElementById(`${vSW.name}-infobox`)){
                infoBox = document.getElementById(`${vSW.name}-infobox`)
                document.getElementById(`${vSW.name}-infobox`).innerHTML='';
            }else{
                infoBox = document.createElement('div');
                infoBox.id=vSW.name+"-infobox";
                infoBox.classList.add("infoBox");
            }

            infoBox.innerHTML=`<h5>${header}</h5>`;
            Object.entries(data).forEach(([k,v])=>{
                infoBox.innerHTML+= `<div>${k}:${v}</div>`;
            })
            infoBox.innerHTML+=`<hr>
<h5>Renk Bilgisi</h5>
<div style="text-align: left;"><span class="correctLetterCorrectPlace correctLetterCorrectPlaceAdd"> </span> ${vSW.titles_translations.infoBoxMessages[0]}</div>
<div style="text-align: left;"><span class="correctLetterWrongPlace correctLetterWrongPlaceAdd" "> </span> ${vSW.titles_translations.infoBoxMessages[1]}</div>
<div style="text-align: left;"><span class="wrongLetter wrongLetterAdd"> </span> ${vSW.titles_translations.infoBoxMessages[2]}</div>
<hr>
${vSW.titles_translations.infoBoxMessages[3]} <a href="${vSW.author}" target="_blank" rel="noopener noreferrer">Caglar Orhan</a>
<br>
${vSW.titles_translations.infoBoxMessages[4]} <a title="${vSW.titles_translations.infoBoxMessages[5]}" href="https://paypal.me/caglarorhan?country.x=US&locale.x=en_US" target="_blank"><img src="./img/paypal-mark-color.svg" alt="${vSW.titles_translations.infoBoxMessages[5]}" width="20" height="20" /></a>  
<a title="${vSW.titles_translations.infoBoxMessages[6]}" href="https://www.buymeacoffee.com/caglarorhan" target="_blank"><img src="./img/bmc-icon.svg" alt="${vSW.titles_translations.infoBoxMessages[6]}" width="20" height="20" /></a>
<br>
<a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank"><img src="./img/TurkceWordle_32.png" alt="Freepik" width="20" height="20" /></a> Icon by Freepik</a>
<br>
<div ><button type="button" id="closeInfoButton" class="close-info">${vSW.titles_translations.infoBoxMessages[7]}</button></div>
`;

            document.body.append(infoBox);
            infoBox.style.display="";
            document.getElementById('closeInfoButton').addEventListener('click',()=>{
                infoBox.classList.add('hidden');
            })
        }
    },
    keyBoard: {
        create: () => {
            let keyBoard = document.createElement('div');
            keyBoard.id = vSW.name + '-keyboard';
            keyBoard.classList.add("keyboard");
            return new Promise((resolve, reject) => {
                document.body.appendChild(keyBoard);
                resolve(keyBoard);
            });
        },
        setKeys: () => {
            vSW.charSet.forEach(char=>{
                const button = document.createElement('button');
                button.innerHTML = char.toLocaleUpperCase(vSW.localeCode);
                button.dataset.letterValue=char.toLocaleUpperCase(vSW.localeCode);
                button.classList.add("keyboard-button");
                button.setAttribute('aria-label', `${vSW.ariaLabels[0]} ${char}`);
                // button.addEventListener('click', () => {
                //     vSW.gameBoard.addChar(char);
                // });
                document.getElementById(vSW.name + '-keyboard').appendChild(button);
            })
            // Attach event listener to the parent element
            document.getElementById(vSW.name + '-keyboard').addEventListener('click', event => {
                // Check if the clicked element is a button
                if (event.target.classList.contains('keyboard-button') && !event.target.classList.contains('wide-button')) {
                    vSW.gameBoard.addChar(event.target.dataset.letterValue);
                }
            });


            // DELETE BUTTON
            let deleteButton = document.createElement('button');
            deleteButton.classList.add("keyboard-button", "wide-button");
            deleteButton.innerHTML = "←";
            deleteButton.id=`${vSW.name}-delete-button`;
            deleteButton.setAttribute('aria-label', vSW.ariaLabels[1]);
            deleteButton.addEventListener('click',()=>{
                let lastGuessedWord = vSW.gameBoard.guessedWords[vSW.gameBoard.guessedWords.length-1];
                //if(lastGuessedWord!=="undefined" ) return;
                if(lastGuessedWord.length){
                    // if(lastGuessedWord.length<vSW.gameBoard.colCount){
                    vSW.gameBoard.guessedWords[vSW.gameBoard.guessedWords.length-1].length=lastGuessedWord.length-1;
                    vSW.gameBoard.placeWordsToBoard();
                    // }
                }
                vSW.gameBoard.placeWordsToBoard();
            });
            document.getElementById(vSW.name + '-keyboard').appendChild(deleteButton);
            // ENTER-RETURN BUTTON ⏎
            let enterButton = document.createElement('button');
            enterButton.classList.add("keyboard-button","wide-button");
            enterButton.innerHTML = "⏎";
            enterButton.id=`${vSW.name}-enter-button`;
            enterButton.setAttribute('aria-label', vSW.ariaLabels[2]);
            enterButton.addEventListener('click',vSW.gameBoard.checkEnteredWord);
            document.getElementById(vSW.name + '-keyboard').appendChild(enterButton);

            // SHIFT BUTTON ACKNOWLEDGE
            if(Object.keys(vSW.langConvertMaps).length > 0){
                let acknowledge = document.createElement('span');
                acknowledge.innerHTML = ` <span class="lang-char-info"><br>${vSW.titles_translations.shiftButtonMessages[0]} <button disabled> Shift </button> ${vSW.titles_translations.shiftButtonMessages[1]}.</span>`;
                document.getElementById(vSW.name + '-keyboard').appendChild(acknowledge);
            }

        }
    },
    largeMessageBox:{
        create(){
            let largeMessage = document.createElement('div');
            largeMessage.id = vSW.name + '_largeMessageBox';
            largeMessage.classList.add('largeMessageBox');
            document.querySelector('.game-board').insertAdjacentElement('afterend',largeMessage);

        },
        async showMessage(message={html:String, timeout: Number}){
            if(!document.getElementById(vSW.name + '_largeMessageBox')){
            vSW.largeMessageBox.create();
            }
            let largeMessageBox = document.getElementById(vSW.name + '_largeMessageBox');
            largeMessageBox.innerHTML=message.html;
            largeMessageBox.style.display="block";
            largeMessageBox.style.position="absolute";
            largeMessageBox.style.zIndex=999999;
            //largeMessageBox.classList.add('glowing');

            let wordMeanings= '';
            largeMessageBox.innerHTML+=''; // word meaning is fetching...
            if(vSW.wordMeaningQueryAPIURL){
                wordMeanings = '<p><ul>'+( await vSW.getTheMeaning(vSW.dictionary[vSW.askedWordIndex])).map(meaning =>`<li>${meaning}`).join('')+'</ul></p>';
                largeMessageBox.innerHTML+=wordMeanings;
            }


            let largeMessageTimer = setTimeout(() =>{
               largeMessageBox.style.display = 'none';
               largeMessageBox.remove();
            }, message.timeout*1000)


        }
    },
    toastMessages: (dataObj={message:String, time:Number, type:String})=>{
        //alert(message);
        if(dataObj.type.includes('large')){
            vSW.largeMessageBox.showMessage({ html: dataObj.message,  timeout: dataObj.time });
        }else{
            if(!document.querySelector('.toastContainer')){
                let toastContainer = document.createElement('div');
                toastContainer.classList.add('toastContainer');
                document.body.appendChild(toastContainer);
            }
            let toastDivs = document.querySelectorAll('.toast');
            let toastDiv = document.createElement('div');
            toastDiv.classList.add('toast', dataObj.type);
            let moment = new Date();
            toastDiv.innerHTML = dataObj.message ;
            document.querySelector('.toastContainer').appendChild(toastDiv);
            setTimeout(() => {
                toastDiv.remove();
                if(!document.querySelectorAll('.toast').length){
                    document.querySelector('.toastContainer').remove();
                }
            }, dataObj.time*1000);
        }

    },
    getTheMeaning: async (word)=>{
        if(!vSW.wordMeaningQueryAPIURL) return;
        vSW.meaningsOfWords[word]=[];
       await fetch(vSW.wordMeaningQueryAPIURL+word)
           .then(response=>response.json())
           .then(jsonData=>{
               jsonData[0].anlamlarListe.forEach(item=>{
                   vSW.meaningsOfWords[word].push(item.anlam.toString());
               })
           })
    return vSW.meaningsOfWords[word];
    },
    promptPWAInstallation: () => {
        if (vSW.deferredPrompt) {
            vSW.deferredPrompt.prompt();
            vSW.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                vSW.deferredPrompt = null;
            });
        }
    },
}
window.addEventListener('load',async ()=>{
    await vSW.init();
document.querySelector('#loading-screen').remove();
    document.body.classList.add('body');
    let logo = document.createElement('img');
    logo.src='./img/TurkceWordle_24.png';
    logo.alt = "This is TurkceWordle game logo. It is a merged W,O,R,D letters in squares.";
    logo.style.width = "24px";
    logo.style.height = "24px";
    logo.classList.add('logo');
    document.body.insertAdjacentElement('afterbegin',logo);
    let versionTag = document.createElement('div');
    versionTag.classList.add('versionTag');
    document.body.insertAdjacentElement('afterbegin',versionTag);
    versionTag.appendChild(logo);
    versionTag.innerHTML+=` <span class="logoVersionTag"> ${vSW.writtenName} <sup class="version">v.${vSW.version}</sup></span>`;
    versionTag.innerHTML+=`<span class="actionButtons">
                                                <button class="install" title="Install this game"><img src="../img/install.png" alt="Install"> </button>
                                                <button class="settings" title="Open the settings"><img src="../img/settings.png" alt="Settings"> </button>
                                                </span>`;
    document.querySelector('.settings').addEventListener('click',()=>{
        vSW.openLanguageSelectionDialog()
    })
    document.querySelector('.install').addEventListener('click',()=>{
        vSW.promptPWAInstallation();
    })

});
document.addEventListener("keydown", event => {

    if(event.shiftKey && !vSW.isSHIFTPressed){
        if(vSW.langConvertMaps.length>0) return;
        vSW.toastMessages({time:6, message: vSW.titles_translations.shiftButtonMessages[2], type:"info"});
        [...Object.entries(vSW.langConvertMaps)].forEach(([srcChar, targetChar])=>{
            targetChar = targetChar.toLocaleUpperCase(vSW.localeCode);
            //console.log(srcChar, targetChar);
            document.querySelectorAll('[data-letter-value="'+targetChar+'"]').forEach(btn=>btn.classList.add('alternative'));
            document.querySelectorAll('[data-letter-value="'+srcChar.toLocaleUpperCase(vSW.localeCode)+'"]').forEach(btn=>btn.classList.add('original'));
        });
        vSW.isSHIFTPressed=true;
        //console.log('SHIFT key basili:'+ vSW.isSHIFTPressed);
    }
    if(event.key==="Enter"){
        document.querySelector(`#${vSW.name}-enter-button`).click();
        return;
    }
    if(event.key==="Backspace"){
        document.querySelector(`#${vSW.name}-delete-button`).click();
        return;
    }
    if (/^[a-z]*$/gi.test(event.key) && event.key.length===1){
        if(vSW.isSHIFTPressed){
            let realChar = vSW.langConvertMaps[event.key.toLocaleLowerCase(vSW.localeCode)] || event.key.toLocaleLowerCase(vSW.localeCode)
            vSW.gameBoard.addChar(realChar)
        }else{
            vSW.gameBoard.addChar(event.key.toLocaleLowerCase(vSW.localeCode));
        }
    }
});

document.addEventListener("keyup", event => {
    //console.log(event.key);
    if (!event.shiftKey) {
        //console.log('Birakilan shiftkeymis');
                        document.querySelectorAll('.keyboard-button').forEach(btn => {
                            btn.classList.remove('alternative');
                        })
                        document.querySelectorAll('.keyboard-button').forEach(btn => {
                            btn.classList.remove('original');
                        })
        vSW.isSHIFTPressed=false;
                        //console.log('SHIFT key birakildi:'+ vSW.isSHIFTPressed);
                        }
})

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    vSW.deferredPrompt = e;
});

