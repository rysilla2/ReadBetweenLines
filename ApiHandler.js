//this code gets the guess word and tries to send it to open ai
import OpenAI from 'openai';

function receiveGuess(word) {
    console.log("Guess word is being sent: ", word)
    if ( dummyApi(word) == true ) {
        return true
    } else {
        return false;
    }
}

function tester() {console.log("ribbon")}

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

function dummyWelcomeInput() {

    var category = "animal";
    var difficulty = "Ludus"

    console.log("Player chooses category: " + category)
    console.log("Player chooses difficulty: " + difficulty)

}

// function cheese() {
//     console.log("Cheese: ")
// }
function butter(msg) {
    console.log("Butter: ", msg)
}

function cheese(msg) {
    console.log(msg)
}



const openai = OpenAI({
  apiKey: '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'// This is also the default, can be omitted
});

// const chatCompletion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{"role": "user", "content": "Hello, OpenAI?"}],
//     // stream: true
//   });
// console.log(chatCompletion.choices[0].message);

var history = [];
async function sendMessage(message) {

    history.push({"role": "user", "content": message})

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: history,
    });

    history.push(chatCompletion.choices[0].message)

    console.log("User: ", message)
    console.log("AI: ", chatCompletion.choices[0].message.content);
    
}

function choco() {
    console.log("chips")
}


