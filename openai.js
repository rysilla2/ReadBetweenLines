//references
//https://github.com/openai/openai-node/discussions/217
//https://hackernoon.com/getting-started-with-openai-api-in-javascript
//https://www.youtube.com/watch?v=4qNwoAAfnk4
//https://olivia-e-brown.medium.com/getting-started-with-openai-api-in-javascript-d1bc365069f0

import OpenAI from 'openai';

const openai = new OpenAI({
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


// testing purposes
sendMessage("Hello, my name is Nino")
sendMessage("What is my name?")

console.log("\n\nConversation History Summary")
history.forEach( e => {
    console.log(e.content)
})
console.log("History end")