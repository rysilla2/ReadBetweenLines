const getResultsData = () => {
  const userInformation = sessionStorage.getItem("userInformation");
  const gameDetails = sessionStorage.getItem("gameDetails");
  const roundDetails = sessionStorage.getItem("roundDetails");
  return {
    ...JSON.parse(userInformation),
    ...JSON.parse(gameDetails),
    ...JSON.parse(roundDetails),
  };
};

const populateDetails = () => {
  const data = JSON.parse(getResultsData());
  console.log(data);
  document.getElementById("category").innerHTML = data.category;
  document.getElementById("word").innerHTML = data.words;
  document.getElementById("round").innerHTML = data.round;
  document.getElementById("duration").innerHTML = data.duration;
  document.getElementById("winner").innerHTML = data.winner;
};

getResultsData();
// setRestultsData();

const onNewGame = async () => {
  // implement restart game method here
  const message = {
    startTime: `Start Time: ${startTime}`,
    endTime: `End Time: ${endTime}`,
    duration: `Duration ${duration}`,
    difficulty: `Difficulty ${difficulty}`,
    playerName: `Player Name ${playerName}`,
    gender: `Gender ${gender}`,
    birthday: `Birthday ${birthday}`,
    age: `Age ${age}`,
    matchDetails: "Match Details",
    type: `Type: ${type}`,
    roundDetails: "Round Details",
    category: `Category: ${category}`,
    word: `Word: ${word}`,
    winner: `Winner: ${winner}`,
    roundDuration: `Round Duration: ${roundDuration}`,
  };
  let headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  let body = new URLSearchParams();
  body.append("token", "API-TOKEN");
  body.append("channel", "C05RGRZ02RL");
  body.append("text", "Hello");

  let requestOptions = {
    method: "POST",
    headers: headers,
    body: body,
    redirect: "follow",
  };

  fetch("https://slack.com/api/chat.postMessage", requestOptions);
  console.log("API call finished");
};
