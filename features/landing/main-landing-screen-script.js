document.addEventListener("DOMContentLoaded", function () {
  const difficultyButtons = document.querySelectorAll(".difficulty-rectangle");
  const categoryForm = document.getElementById("categoryForm");
  const difficultyLevelInput = document.getElementById("difficultyLevel");
  const categoryInput = document.getElementById("categoryInput");
  const randomizeButton = document.querySelector(".btn-randomize");
  const categoryInputField = document.getElementById("category");
  let roundDetails = null;

  // Function to handle button click
  function handleButtonClick(event) {
    // Remove the 'active' class from all buttons
    difficultyButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // Add the 'active' class to the clicked button
    event.currentTarget.classList.add("active");
  }

  // Function to generate a random category
  function getRandomCategory() {
    const categories = ["country", "animal", "food", "color", "marvel hero"];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  // Function to populate the input field with a random category
  function populateRandomCategory() {
    const randomCategory = getRandomCategory();
    categoryInputField.value = randomCategory;
  }

  // Attach click event listeners to each difficulty button
  difficultyButtons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  // Attach click event listener to the Randomize button
  randomizeButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    populateRandomCategory();
  });

});

const getDifficulty = () => {
  sessionStorage.getItem("userInformation");
  let difficulty = "";
  let userInformation = sessionStorage.getItem("userInformation");
  let age = JSON.parse(userInformation).age;

  /* Difficulty Based on user's age */
  if (age <= 8) {
    difficulty = "Ludus";
  } else if (age <= 15) {
    difficulty = "Rhetor";
  } else {
    difficulty = "Philosopher";
  }
};

document.getElementById("ludus").addEventListener("click", () => {
  roundDetails = {
    difficulty: "ludus",
    time: 40,
    turns: 10,
    rounds: 1,
  };
  // goToPuzzlePage();
});
document.getElementById("rhetor").addEventListener("click", () => {
roundDetails = {
  difficulty: "rhetor",
  time: 20,
  turns: 7,
  rounds: 3,
};
});

document.getElementById("philosopher").addEventListener("click", () => {
 roundDetails = {
  difficulty: "philosopher",
  time: 10,
  turns: 5,
  rounds: 5,
};
});
const goToPuzzlePage = () => {
  document.location.href =
    document.location.origin + "/features/puzzle/puzzle-screen.html";
};

const startGame = () => {
  const category = document.getElementById('category-input').value;
  sessionStorage.setItem('roundDetails', {
    ... roundDetails,
    category: category,
  });
  goToPuzzlePage();
}