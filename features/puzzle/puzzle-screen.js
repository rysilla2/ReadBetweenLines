//moved the JS to this new file 

    function setUserInput() {
        const input = document.getElementById('word');
        sessionStorage.setItem('word', input.value);
        receiveGuess(input.value)
    }

    const setRestultsData = () => {
        sessionStorage.setItem('resultsData', JSON.stringify({
            category: 'Animal',
            word: 'input',
            round: 2,
            duration: '2:00',
            winner: 'Player 1',
            matchType: 'Rematch'
        }))
    };


    function resetGame() {// this is for the reset button
        // it will clear the input 
        document.getElementById('word').value = '';
        restartCountdown();

    }

    function countdown() {
        var seconds = 60; // Number of seconds to count down

        var countdownTimer = setInterval(function () {
            seconds--;

            document.getElementById("countdown").innerHTML = seconds + "s";

            if (seconds <= 0) {
                clearInterval(countdownTimer);
                document.getElementById("countdown").innerHTML = "Expired";
            }
        }, 1000);
    }

    // Start the countdown automatically when the page loads
    countdown();


