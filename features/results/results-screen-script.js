const setRestultsData = () => {
  sessionStorage.setItem(
    "resultsData",
    JSON.stringify({
      category: "Animal",
      word: "Kangaroo",
      round: 2,
      duration: "2:00",
      winner: "Player 1",
      matchType: "Rematch",
    })
  );
};

const getResultsData = () => {
  const resultsData = sessionStorage.getItem("resultsData");
  return resultsData;
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

setRestultsData();
populateDetails();

const onNewGame = () => {
  window.location.href =
    document.location.origin + "/features/welcome/welcome-screen.html";
};
