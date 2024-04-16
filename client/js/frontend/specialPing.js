let decimalToBinary = (num, binaryHeader= false) => {
    head = binaryHeader ? "0b0" : "0";
    return head + num.toString(2);
};

/**
 * @param {string} message - list of characters to turn into binary values
 * @return {array} - A list of binary values
 */
let stringToBinary = (message) => {
    let binaryCollection = [];
    for (let i = 0; i < message.length; i++){
        let asciiValue = message.charCodeAt(i);
        let binaries = decimalToBinary(asciiValue)
        binaryCollection.push(binaries)
    }

    return binaryCollection;
}

/** 
 * @param {array} binaries - A collection binary numbers in string format
 * @returns {array} - Number collection with ascii values
*/
let parseBinary = (binaries) => {
    let decimals = binaries.map((num) => {
        let hasHeader = num.slice(0, 2) === "0b";
        num = hasHeader ? num : "0b" + num;
        return Number(num);
    });

    return decimals;
};

/**
 * 
 * @param {array} numberList - A collection of ascii values
 * @returns {string} - the message hidden in numberlist values
 */
let toMessage = (numberList) => {
    let message;
    if (Array.isArray(numberList)){
        message = numberList.map((num)=> {
            return String.fromCharCode(num)
        });
    }

    return message.join("");
}

/**
 * 
 * @param {array} code - 2 length array of binary representing characters 
 * @param {string} message - a message to encode within a binaristic code
 * @returns {string} - a binary encoded message
 */
let toSecret = (code, message) => {
    let binaryArray = stringToBinary(message);
    let secretArray = binaryArray.map((message) => {
        let secret = "";
        for (let i = 0; i < message.length; i++){
            secret = secret + code[message[i]];
        }
        return secret;
    });

    return secretArray.join(" ");
}

/**
 * 
 * @param {Array} code : 2 length array of characters representing 0 and 1 binaristic values 
 * @param {String} secret : message consisting of special characters
 * @returns {Array} numbers that have an ascii value 
 */
let fromSecret = (secret, code) => {
    secret = secret.split(" ");
    let binaryZero = code[0];
    let binaryOne  = code[1]
    let indenticalCharacters = binaryZero === binaryOne;
    let sameSize   = binaryZero.length === binaryOne.length;
    
    //this data structure uses the exact difference in the binary codes to indentify any explicit bit of
    //a secret binary message
    let differenceSignature = {
        zeroChar: "",
        oneChar: "",
        index: 0,
    }

    
    if (!indenticalCharacters){
        let charIter = 0;
        let zeroChar = "";
        let oneChar  = "";
        while(charIter < binaryZero.length || charIter < binaryOne.length){
            differenceSignature.index = charIter  
            
            //assign in case that there's characters left, otherwise the difference is that a code is shorter
            if (charIter < binaryZero.length){
                zeroChar = binaryZero[charIter];
            }
            else {//no more characters left, assign blank character
                differenceSignature.zeroChar = "";
                differenceSignature.oneChar = binaryOne[charIter];
                break;     
            }
            if(charIter < binaryOne.length){
                oneChar = binaryOne[charIter];
            }
            else{
                differenceSignature.zeroChar = binaryZero[charIter];
                differenceSignature.oneChar = "";
                break;
            }
            
            //assign in case that characters are observerd as different
            if (zeroChar !== oneChar){
                differenceSignature.zeroChar = zeroChar;
                differenceSignature.oneChar  = oneChar;
                break;
            }

            charIter++;
        }
    }
    
    console.log(`Difference Signature is:`, differenceSignature)

    let asciiArray = secret.map((word) => {
        let revealed = "0b";
        while (word.length > 0){
            if (indenticalCharacters){
                revealed = revealed + binaryZero;
                word = word.slice(binaryZero.length);
                continue;
            }

            if (differenceSignature.zeroChar === word[differenceSignature.index]) {
                revealed = revealed + "0";
                word = word.slice(binaryZero.length);
                
            }
            else {
                revealed = revealed + "1";
                word = word.slice(binaryOne.length);
            }
        }

        return Number(revealed);
    });

    return asciiArray;
}

let keyCode = ["A.", "..P"]

let message = "AIzaSyA96PDr1xRCeXePmr48HQ3UVeF4SkxL1jQ";

let secret = toSecret(keyCode, message);
let revealed = fromSecret(secret, keyCode)
let remessage = toMessage(revealed);


console.log(`secret: ${secret} ${typeof secret}`);
console.log(`revealed secret: ${revealed}`)



//   firebase.initializeApp({
//     apiKey: toMessage(fromSecret("A...PA.A.A.A.A...P A...PA.A...PA.A...P A...P..P..P..PA...PA. A...P..PA.A.A.A...P A...PA...PA.A...P..P A...P..P..P..PA.A...P A...PA.A.A.A.A...P A...P..P..PA.A...P A...P..PA...P..PA. A...PA...PA.A.A.A. A...PA.A.A...PA.A. A...P..P..PA.A...PA. A...P..PA.A.A...P A...P..P..P..PA.A.A. A...PA...PA.A...PA. A...PA.A.A.A...P..P A...P..PA.A...PA...P A...PA...P..PA.A.A. A...P..PA.A...PA...P A...PA...PA.A.A.A. A...P..PA...P..PA...P A...P..P..PA.A...PA. A...P..PA...PA.A. A...P..P..PA.A.A. A...PA.A...PA.A.A. A...PA...PA.A.A...P A...P..PA.A...P..P A...PA...PA...PA...P A...PA...PA...P..PA. A...P..PA.A...PA...P A...PA.A.A...P..PA. A...P..PA...PA.A. A...PA...PA.A...P..P A...P..PA...PA...P..P A...P..P..P..PA.A.A. A...PA.A...P..PA.A. A...P..PA.A.A...P A...P..PA...PA...PA. A...PA...PA.A.A...P",["A.", "..P"]));,
//     authDomain: "fetch-quest-data.firebaseapp.com",
//     databaseURL: "https://fetch-quest-data.firebaseio.com",
//     projectId: "fetch-quest-data",
//     storageBucket: "fetch-quest-data.appspot.com",
//     messagingSenderId: "930118833541",
//     appId: "1:930118833541:web:b3059c121ff6c3d25860ec",
//     measurementId: "G-MN1XZZCZFF"
//   });