const getResultsData = () => {
  const userInformation = sessionStorage.getItem("userInformation");
  const gameDetails = sessionStorage.getItem("gameDetails");
  const roundDetails = sessionStorage.getItem("roundDetails");
  const details = {
    ...JSON.parse(userInformation),
    ...JSON.parse(gameDetails),
    ...JSON.parse(roundDetails),
  };
return details;
};

const populateDetails = () => {
  const data = getResultsData();
  console.log(data);
  document.getElementById("category").innerHTML = data.category;
  document.getElementById("word").innerHTML = data.word;
  document.getElementById("round").innerHTML = data.round;
  // document.getElementById("duration").innerHTML = data.duration;
  document.getElementById("winner").innerHTML = data.winner;
  populateDetails(data);
};

const sendDetails = (data) => {
    // implement restart game method here
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
  
    let body = new URLSearchParams();
    body.append("token", "API_TOKEN");
    body.append("channel", "C05RGRZ02RL");
    body.append("text", `Player Name: ${data.name}\nWord: ${data.word}\nRounds: ${data.rounds}\nWinner: ${data.winner}`);
  
    let requestOptions = {
      method: "POST",
      headers: headers,
      body: body,
      redirect: "follow",
    };
  
    fetch("https://slack.com/api/chat.postMessage", requestOptions);
}
// setRestultsData();

const onNewGame = async () => {
  document.location.href = document.location.origin + "/features/welcome/welcome-screen.html";
  console.log("API call finished");
};

populateDetails();