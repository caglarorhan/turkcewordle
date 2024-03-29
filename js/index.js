import {dictionary} from './dictionary.js';
document.body.innerHTML='';
document.title="Turkce Wordle: Turkce Kelime Tahmin Oyunu";
const vSW = {
    name: 'TurkceWordle',
    version:'2024.0.2',
    author:'https://github.com/caglarorhan',
    dictionary:[],
    defaultLang:'tr',
    charSet:'a,b,c,ç,d,e,f,g,ğ,h,ı,i,j,k,l,m,n,o,ö,p,r,s,ş,t,u,ü,v,y,z'.split(','),
    langConvertMaps: {
        tr:{u: 'ü', i: 'i', o: 'ö', c: 'ç', s: 'ş', g: 'ğ'}
    },
    askedWordIndex:null,
    isSHIFTPressed:false,
    meaningsOfWords:Object.create(null),
    init: () => {
        vSW.dictionary = dictionary;
        vSW.gameBoard.create()
            .then(() => {
                vSW.keyBoard.create().then(() => {
                    vSW.keyBoard.setKeys();
                })
                vSW.gameBoard.setBoard();
                vSW.askedWordIndex = vSW.getRandomWordIndexFromDictionary();
                vSW.gameBoard.showInfo("SKOR",JSON.parse(window.localStorage.getItem(vSW.name)).score);

            })

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
                btn.classList.remove(...btn.classList)
                btn.classList.add("keyboard-button");
            })

            vSW.hideTheMeaning();
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
                            vSW.showTheMeaning(focusedGuessedWord);
                        }
                    }
                })
                rowDiv.addEventListener('mouseout',()=>{
                    vSW.hideTheMeaning();
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
            if (!vSW.gameBoard.guessedWords.length) {
                let newWord = [];
                newWord.push(char);
                vSW.gameBoard.guessedWords.push(newWord);
            } else {
                let lastGuessedWordIndex = vSW.gameBoard.guessedWords.length - 1
                if (vSW.gameBoard.guessedWords[lastGuessedWordIndex].length < vSW.gameBoard.colCount) {
                    vSW.gameBoard.guessedWords[lastGuessedWordIndex].push(char);
                }
            }
            vSW.gameBoard.placeWordsToBoard();
        },
        placeWordsToBoard: () => {
            let theInputs = document.querySelectorAll(`#${vSW.name} input`);
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
                    theInputs[inputIndex].value=targetLetterFromGuessedWord.toLocaleUpperCase('tr');
                }
            }
        },
        checkEnteredWord:()=>{
            let theInputs = document.querySelectorAll(`#${vSW.name} input`);
            if(vSW.gameBoard.guessedWords.length===0) return;
            let guessedWordsLength = vSW.gameBoard.guessedWords.length;
            let lastEnteredWord = vSW.gameBoard.guessedWords[guessedWordsLength-1];
            let askedWord = vSW.dictionary[vSW.askedWordIndex];
            let askedWordLettersArray = askedWord.split('');
            // console.log(askedWord);
            // console.log(JSON.stringify(vSW.gameBoard.guessedWords))

            if(lastEnteredWord.length!==vSW.gameBoard.colCount){
                //vSW.gameBoard.guessedWords.forEach(word=>console.log(word));
                console.log(lastEnteredWord.length,vSW.gameBoard.colCount)
                vSW.toastMessages({message:`Tahmin icin en az ${vSW.gameBoard.colCount} harf girmelisiniz!`, time:3, type:"info"});
                return;
            }
            if(lastEnteredWord.length===vSW.gameBoard.colCount){
                // letterCountMap
                let letterCountMap =Object.create(null);
                askedWordLettersArray.forEach(letter=>{
                    letterCountMap[letter]=++letterCountMap[letter] || 1;
                })
                // console.log(JSON.stringify(letterCountMap))

                //if word guessed correctly
                if(lastEnteredWord.join('')===askedWord){
                    vSW.gameBoard.endGame({didWin:true, message:"Bravvo... Sorulan kelimeyi buldunuz!"});
                }else{
                    if(vSW.dictionary.includes(lastEnteredWord.join(''))){
                        vSW.getTheMeaning(lastEnteredWord.join(''));
                        let newWord = [];
                        vSW.gameBoard.guessedWords.push(newWord);
                    }else{
                        vSW.toastMessages({message:`Bu kelime sozlukte yok!`, time:3, type:"warning"});
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
                Oyun bitti! Kaybettiniz!
                Sorulan kelime: <b>${askedWord}</b>!
                `});

            }
        },
        keyboardKeyAddClass:(letter,newClassName, oldClassName)=>{
            letter = letter.toLocaleUpperCase('tr');
                document.querySelector(`#${vSW.name}-keyboard button[data-letter-value='${letter}']`).classList.add(newClassName);
        },
        endGame:(data={didWin:false, message:"Herhangi bir mesaj bulunamadi."})=>{
            let playedGameLogs=JSON.parse(window.localStorage.getItem(vSW.name));
            //console.log(`Kayit oncesi data: ${JSON.stringify(playedGameLogs)}`);
            let messageType = 'success';
            if(data.didWin){
                playedGameLogs.score[(vSW.gameBoard.guessedWords.length)]+=1
                window.localStorage.setItem(vSW.name,JSON.stringify(playedGameLogs))
                setTimeout(vSW.gameBoard.reset,2000);
            }else{
                messageType= 'error';
                playedGameLogs.score["fail"]+=1
                window.localStorage.setItem(vSW.name,JSON.stringify(playedGameLogs))
                setTimeout(vSW.gameBoard.reset,2000);
            }
            vSW.toastMessages({message:data.message.toString(), time:5, type:messageType});
            vSW.gameBoard.showInfo("SCORE",JSON.parse(window.localStorage.getItem(vSW.name)).score);
            document.querySelectorAll( `#${vSW.name}-keyboard button`).forEach(btn=>btn.setAttribute('disabled','disabled'));
            //console.log(`Kayit sonrasi data: ${JSON.stringify(playedGameLogs)}`);
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
<div style="text-align: left;"><span class="correctLetterCorrectPlace correctLetterCorrectPlaceAdd"> </span> doğru harf, doğru yerde</div>
<div style="text-align: left;"><span class="correctLetterWrongPlace correctLetterWrongPlaceAdd" "> </span> doğru harf, yanlış yerde</div>
<div style="text-align: left;"><span class="wrongLetter wrongLetterAdd"> </span> yanlış harf</div>
<hr>
Kodlayan: <a href="${vSW.author}" target="_blank" rel="noopener noreferrer">Caglar Orhan</a>
<br>
Beni desteklemek icin: <a title="PayPal uzerinden bagis yapin" href="https://paypal.me/caglarorhan?country.x=US&locale.x=en_US" target="_blank"><img src="./img/paypal-mark-color.svg" alt="PayPal uzerinden bagis" width="20" height="20" /></a>  
<a title="BuyMeACoffee dan bana bir kahve ismarlayin ;)" href="https://www.buymeacoffee.com/caglarorhan" target="_blank"><img src="./img/bmc-icon.svg" alt="BuyMeACoffee dan bana bir kahve ismarlayin ;)" width="20" height="20" /></a>
<br>
<a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank"><img src="./img/TurkceWordle_32.png" alt="Freepik" width="20" height="20" /></a> Icon by Freepik</a>
`;

            document.body.append(infoBox);
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
                button.innerHTML = char.toLocaleUpperCase('tr');
                button.dataset.letterValue=char.toLocaleUpperCase('tr');
                button.classList.add("keyboard-button");
                button.addEventListener('click', () => {

                    vSW.gameBoard.addChar(char);
                });
                document.getElementById(vSW.name + '-keyboard').appendChild(button);
            })
            // DELETE BUTTON
            let deleteButton = document.createElement('button');
            deleteButton.classList.add("keyboard-button");
            deleteButton.innerHTML = "←";
            deleteButton.id=`${vSW.name}-delete-button`;
            deleteButton.addEventListener('click',()=>{
                let lastGuessedWord = vSW.gameBoard.guessedWords[vSW.gameBoard.guessedWords.length-1];
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
            enterButton.classList.add("keyboard-button");
            enterButton.innerHTML = "⏎";
            enterButton.id=`${vSW.name}-enter-button`;
            enterButton.addEventListener('click',vSW.gameBoard.checkEnteredWord);
            document.getElementById(vSW.name + '-keyboard').appendChild(enterButton);

            // SHIFT BUTTON ACKNOWLEDGE
            let acknowledge = document.createElement('span');
            acknowledge.innerHTML = ` Turkce karakterler icin <button disabled> Shift </button> tusuna basili tutun.`;
            document.getElementById(vSW.name + '-keyboard').appendChild(acknowledge);
        }
    },
    toastMessages:(dataObj={message:String, time:Number, type:String="message"})=>{
        //alert(message);
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
        }, 5*1000);
    },
    getTheMeaning:(word)=>{
        vSW.meaningsOfWords[word]=[];
        fetch('https://sozluk.gov.tr/gts?ara='+word)
            .then(data=>{
                return data.json()
            })
            .then(jsonData=>{
                jsonData[0].anlamlarListe.forEach(item=>{
                    //console.log(item.anlam);
                    vSW.meaningsOfWords[word].push(item.anlam.toString());
                })
                vSW.showTheMeaning(word)
            })

    },
    showTheMeaning:(word)=>{
        let theWordMeaningDiv;
        if(document.getElementById(`${vSW.name}-meanings`)){
            theWordMeaningDiv = document.getElementById(`${vSW.name}-meanings`);
        }else{
            theWordMeaningDiv= document.createElement('div')
            theWordMeaningDiv.id = `${vSW.name}-meanings`;
        }
        theWordMeaningDiv.classList.add('showTheMeaningDiv');
        theWordMeaningDiv.innerHTML=`<h4>${word.toLocaleUpperCase('tr')}</h4><ol>`;
        vSW.meaningsOfWords[word].forEach(anlam=>{
            theWordMeaningDiv.innerHTML+=`<li>${anlam}</li>`;
        });
        theWordMeaningDiv.innerHTML+=`<hr>Kaynak: <a href="https://sozluk.gov.tr" target="_blank" rel="noopener noreferrer">TDK Dil Sozlugu</a>`;
        let boardDivItem = document.querySelector(`#${vSW.name}`);
        let rect = boardDivItem.getBoundingClientRect();
        theWordMeaningDiv.style.top = rect.top+"px";
        theWordMeaningDiv.style.left = (rect.left-300-10)+"px";
        theWordMeaningDiv.style.height = (rect.bottom-rect-top)+"px";
        document.body.append(theWordMeaningDiv);
    },
    hideTheMeaning:()=>{
        if(document.querySelector(`#${vSW.name}-meanings`)){
            document.querySelector(`#${vSW.name}-meanings`).remove();
        }
    },
    padStartWithZero:(number)=>{
        return number.toString().padStart(2, '0');
    }
}
window.addEventListener('resize', vSW.hideTheMeaning);
window.addEventListener('load',()=>{
    vSW.init();
    document.body.classList.add('body');
    let logo = document.createElement('img');
    logo.src='./img/TurkceWordle_24.png';
    logo.classList.add('logo');
    document.body.insertAdjacentElement('afterbegin',logo);
    let versionTag = document.createElement('div');
    versionTag.classList.add('versionTag');
    document.body.insertAdjacentElement('afterbegin',versionTag);
    versionTag.appendChild(logo);
    versionTag.innerHTML+=` <span class="logoVersionTag"> ${vSW.name} <sup class="version">v.${vSW.version}</sup></span>`;
});
document.addEventListener("keydown", event => {

    if(event.shiftKey && !vSW.isSHIFTPressed){
        vSW.toastMessages({time:6, message: "SHIFT basikken ENG benzerine basin. Ornegin: Ğ icin G'ye basin, Ş icin S'ye", type:"info"});
        [...Object.entries(vSW.langConvertMaps[vSW.defaultLang])].forEach(([srcChar, targetChar])=>{
            targetChar = targetChar.toLocaleUpperCase('tr');
            //console.log(srcChar, targetChar);
            document.querySelectorAll('[data-letter-value="'+targetChar+'"]').forEach(btn=>btn.classList.add('alternative'));
            document.querySelectorAll('[data-letter-value="'+srcChar.toLocaleUpperCase('tr')+'"]').forEach(btn=>btn.classList.add('original'));
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
            //console.log('Shift key basiliyken tusa basildi. Basilan tus: '+event.key);
            let realChar = vSW.langConvertMaps[vSW.defaultLang][event.key.toLocaleLowerCase('tr')] || event.key.toLocaleLowerCase('tr')
            vSW.gameBoard.addChar(realChar)
        }else{
            vSW.gameBoard.addChar(event.key.toLocaleLowerCase('tr'));
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

