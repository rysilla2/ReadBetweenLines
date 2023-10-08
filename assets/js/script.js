document.addEventListener("DOMContentLoaded", function () {
    const difficultyButtons = document.querySelectorAll(".difficulty-rectangle");

    // Function to handle button click
    function handleButtonClick(event) {
        // Remove the 'active' class from all buttons
        difficultyButtons.forEach((button) => {
            button.classList.remove("active");
        });

        // Add the 'active' class to the clicked button
        event.currentTarget.classList.add("active");
    }

    // Attach click event listeners to each difficulty button
    difficultyButtons.forEach((button) => {
        button.addEventListener("click", handleButtonClick);
    });
});