document.addEventListener("DOMContentLoaded", function () {
    const difficultyButtons = document.querySelectorAll(".difficulty-rectangle");
    const categoryForm = document.getElementById("categoryForm");
    const difficultyLevelInput = document.getElementById("difficultyLevel");
    const categoryInput = document.getElementById("categoryInput");
    const randomizeButton = document.querySelector(".btn-randomize");
    const categoryInputField = document.getElementById("category");

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

    // Add a submit event listener to the form
    categoryForm.addEventListener("submit", function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the selected difficulty level
        const selectedDifficulty = document.querySelector(".difficulty-rectangle.active");
        if (selectedDifficulty) {
            difficultyLevelInput.value = selectedDifficulty.id; // Set the difficulty level value
        }

        // Submit the form
        categoryForm.submit();
    });

    
});

const getDifficulty = () => { sessionStorage.getItem("userInformation");
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
