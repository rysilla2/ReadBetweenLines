//moved the JS to this new file 

var roundDetails = sessionStorage.getItem("roundDetails")

var userScore = 0;
var computerScore = 0;
var difficulty = JSON.parse(roundDetails).difficulty; //temp
var category = JSON.parse(roundDetails).category; //temp
var originalRounds = JSON.parse(roundDetails).rounds; //fromStrorage
var rounds = 1;
var originalTurns = JSON.parse(roundDetails).turns; //turns based on difficulty //fromStorage
var turns = originalTurns;
var numberOfHints = 0; //determines how manu hints are created //fromStorage
var hints = [];
var hintNo = 1; //used to flip between which hints to display.
let timer = null;

//this function initializes the round, by getting a new word and generating hints
function initWordRound(category, difficulty) {

    console.log("Player chooses category: " + category)
    console.log("Player chooses difficulty: " + difficulty)
    document.getElementById("roundboard").innerHTML = "Round: " + rounds + "/" + originalRounds;
    document.getElementById("categoryLabel").innerHTML = "Category: ";
    document.getElementById("turnboard").innerHTML = "Turns Left: " + turns;
    apiCommunicator(category)

    updateData();
}
//this updates the scoreboard based on the winner of the last round

function updateData() {
    document.getElementById("scoreboard").innerHTML =
        "Your Score: " + userScore;
    document.getElementById("computerScoreboard").innerHTML =
        "PC Score: " + computerScore;
    document.getElementById("categoryLabel").innerHTML =
        "Category: " + category;
    document.getElementById("roundboard").innerHTML =
        "Round: " + rounds + "/" + originalRounds;
    document.getElementById("turnboard").innerHTML = "Turns Left: " + turns;
}

//resets the score back to zero when game is played again
function resetScore() {
    userScore = 0;
    computerScore = 0;
    rounds = 1;
    updateData();
}

//adds a score based on the guessed word
function addScore(isWinner) {
    if (isWinner) {
        userScore += 1;
    } else {
        computerScore += 1;
    }
    updateData();
}

//pass button
function passTurn() {
    addScore(false);
    document.getElementById("hintPanel").innerHTML = "Surrendered!";
    updateData();
    //   apiCommunicator(category);
    sessionStorage.setItem(
        "resultsData",
        JSON.stringify({
            category: "Animal",
            word: "input",
            round: 2,
            duration: "2:00",
            winner: "Player 1",
            matchType: "Rematch",
        })
    );
}

function countdown(restart, stop) {
    let seconds = 60; // Number of seconds to count down

    if (!restart) {
        timer = setInterval(function () {
            //this is for the timer only 60s
            seconds--;

            document.getElementById("countdown").innerHTML = seconds + "s";

            if (seconds <= 0) {
                clearInterval(timer);
                document.getElementById("countdown").innerHTML = "Expired";
            }
        }, 1000);
        return;
    }
    if (stop) {
        clearInterval(timer);
        return;
    }
    clearInterval(timer);
    countdown(false, false);
}

//shuffles hints and tips
var hintI = 1;
function shuffleHint() {
    console.log("Print hints, ", hintI, " : ", hints[hintI]);
    if (hintI > originalTurns) {
        hintI = 1;
    }
    document.getElementById("hintPanel").innerHTML = hints[hintI];
    document.getElementById("controlPanel").style.display = "flex";
    hintI += 1;
}

//used to handle game cycle/round
function gameCycle() {

    // if (turns <= 0) {
    //     return false;
    // }

    

    if (userScore >= originalRounds) {
        changeHintPanel(randomMessage())
        storeDetails(category, sessionStorage.getItem('word'), "player", '-')
        return true;
    } else if (computerScore >= originalRounds || turns <= 0) {
        changeHintPanel("You've loss the game!")
        storeDetails(category, sessionStorage.getItem('word'), "computer", '-')
        console.log("You've loss the game")
    } else {
        apiCommunicator(category)
        rounds += 1; updateData()
        return false;
    }
}


//used to check if the word checked matches the correct word
function wordChecker() {
    turns -= 1; updateData();

    countdown(false, false)

    console.log("my score: " + userScore)
    console.log("computer score: " + computerScore)
    var correctWord = sessionStorage.getItem('word')
    var guessedWord = document.getElementById('wordInput').value
    guessedWord = guessedWord.toLowerCase();
    guessedWord = guessedWord.trim();

    if (correctWord == guessedWord) { // word is guessed
        document.getElementById("hintPanel").innerHTML = randomMessage();
        hideControlPanel(false)

        addScore(true)

        if (gameCycle()) {
            countdown(true, false)
            return;
        }

    } else { // word not guessed

        if (turns <= 0) {
            changeHintPanel("You ran out of turns!")
            hideControlPanel(true)
            addScore(false)

            if (!gameCycle()) {
                return;
            }
            turns = originalTurns; updateData();
        }

        shuffleHint()
    }

}

//change hint panel message
function changeHintPanel(msg) {
    document.getElementById("hintPanel").innerHTML = msg;
}

function hideControlPanel(isHidden) {
    if (isHidden) {
        document.getElementById("controlPanel").style.display = "none";
    } else {
        document.getElementById("controlPanel").style.display = "flex";
    }
}

// this is for storing the match details
function storeDetails(category, word, winner, timestop) {

    const details = {
        category: category,
        word: word,
        winner: winner,
        //  duration:duration,
        timestop: timestop, // to record the duration or what time did it stop
    };
    // this is for storing it in the session storage
    sessionStorage.setItem('storeDetails', JSON.stringify(details));

}

// this is the stopwatch to track the duration
window.addEventListener("load", function () {
    const stopwatch = this.document.getElementById("stopwatch");

    let time = 0; //for setting the initial time

    function incrementTime() {
        time++;

        stopwatch.textContent = ("0" + Math.trunc(time / 60)).slice(-2) + ":" +
            ("0" + (time % 60)).slice(-2);
    }

    incrementTime();//start the timer 
    this.setInterval(incrementTime, 1000);

    //need final round to end to stop the watch 
    // for recording the duration

    //testing this is for checking if the current round is the final round
    if (currentRound === originalRounds) {
        clearInterval(incrementTime);// to stop the timer
    }

})


//saves the word into local storage.
function saveWord(word) {
    console.log("Saving: ", word);
    sessionStorage.setItem("word", word);
}

function apiCommunicator(category) {
    console.log("Summary");
    var msg = `
            I want you to pick one word, not too simple, under the category of ${category}.
            Give me hints of ${turns} separate simple sentences in bullet points for the word.
            Do not use '-' in sentences or in words.
            For example, instead of super-man, use superman.
            For example, instead of second-largest, use second largest.

            Strictly do not use the word or variations for the word when making the hints.

            Follow this as a sample response =
            Philippines
            - It is an archipelagic country.
            - The country is in southeast asia.
            - The country is known for its beaches and kind people.
            - The population is around 100 million.
            - Some foods include sinigang and adobo.
            ;

            Make sure the tips are ${turns} bullet points.

            When stating the name of the word, do not include anything else such as periods, colons, or semicolons.

        `;

    console.log(msg);

    var myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        "Bearer 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"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        messages: [
            {
                role: "user",
                content: msg,
            },
        ],
        model: "gpt-3.5-turbo",
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const res = JSON.parse(result);
            console.log(res.choices[0].message.content);

            var tempArr = res.choices[0].message.content.split("-");

            hints = tempArr;
            var wordToBeSaved = hints[0];
            shuffleHint();

            //to make sure the word does not appear
            var tempHints = [];
            for (var i = 1; i < hints.length; i++) {
                tempHints.push(hints[i].replace(hints[0], "-blank-"));
                tempHints.push(hints[i].replace(hints[0] + "s", "-blank-")); // removing word for example penguin and penguins (with added 's')
            }

            hints = tempHints;

            wordToBeSaved = wordToBeSaved.toLowerCase();
            wordToBeSaved = wordToBeSaved.replace(":", " ");
            wordToBeSaved = wordToBeSaved.trim();
            console.log("Sending: ", wordToBeSaved);
            saveWord(wordToBeSaved);

            countdown(false, false)
        })
        .catch((error) => {
            console.log("error", error);
            changeHintPanel("Too many requests! Please wait for awhile.");
        });
}

function apiCommunicator(category) {
    console.log("Summary")
    var msg =
        `
          I want you to pick one word, not too simple, under the category of ${category}. 
          Give me hints of ${turns} separate simple sentences in bullet points for the word. 
          Do not use '-' in sentences or in words. 
          For example, instead of super-man, use superman.
          For example, instead of second-largest, use second largest.

          Strictly do not use the word or variations for the word when making the hints.

          Follow this as a sample response =
          Philippines 
          - It is an archipelagic country.
          - The country is in southeast asia.
          - The country is known for its beaches and kind people.
          - The population is around 100 million.
          - Some foods include sinigang and adobo.
          ;

          Make sure the tips are ${turns} bullet points.

          When stating the name of the word, do not include anything else such as periods, colons, or semicolons.

      `

    console.log(msg)

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "messages": [
            {
                "role": "user",
                "content": msg
            }
        ],
        "model": "gpt-3.5-turbo"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then(response => response.text())
        .then(result => {
            const res = JSON.parse(result)
            console.log(res.choices[0].message.content)

            var tempArr = res.choices[0].message.content.split("-")

            hints = tempArr;
            var wordToBeSaved = hints[0]
            shuffleHint();

            //to make sure the word does not appear
            var tempHints = [];
            for (var i = 1; i < hints.length; i++) {
                tempHints.push(hints[i].replace(hints[0], "-blank-"))
                tempHints.push(hints[i].replace((hints[0] + 's'), "-blank-")) // removing word for example penguin and penguins (with added 's')
            }

            hints = tempHints;

            wordToBeSaved = wordToBeSaved.toLowerCase();
            wordToBeSaved = wordToBeSaved.replace(":", " ")
            wordToBeSaved = wordToBeSaved.trim()
            console.log("Sending: ", wordToBeSaved)
            saveWord(wordToBeSaved)

            if (turns == originalTurns) {
                countdown(false, false)
            }

        }
        )
        .catch(error => {
            console.log('error', error)
            changeHintPanel("Too many requests! Please wait for awhile.")
        }
        );
}

initWordRound(category);

function randomMessage() {

    let messages = ["Word Phenom!", "Linguistic Sorceror!", "Lexical Alchemist!", "Word Craft Guru!"]
    let randMessage = Math.floor(Math.random() * 4);
    console.log(Math.floor(Math.random() * 4))
    // console.log(messages[randMessage])
    return messages[randMessage];
}
