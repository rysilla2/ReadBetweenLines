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
  document.getElementById("word").innerHTML = data.word;
  document.getElementById("round").innerHTML = data.round;
  document.getElementById("duration").innerHTML = data.duration;
  document.getElementById("winner").innerHTML = data.winner;
  document.getElementById("matchType").innerHTML = data.matchType;
};

getResultsData();
const onNewGame = () => {
  sessionStorage.clear();
  document.location.href =
    document.location.origin + "/features/welcome/welcome-screen.html";
};
