//this code gets the guess word and tries to send it to open ai
function receiveGuess(word) {
    console.log("Guess word is being sent: ", word)
    if ( dummyApi(word) == true ) {
        return true
    } else {
        return false;
    }
}

function dummyApi(word) {
    const words = ["dolphin", "dog", "chicken", "crocodile", "alligator"]

    word = word.trim();
    word = word.toLowerCase();

    for (var i = 0; i < words.length; i++) {
        //console.log(words[i])
        if (word == words[i]) {
            console.log("Found match!")
            return true;
        }
        
    }

    console.log("No match!")
    return false;
}


