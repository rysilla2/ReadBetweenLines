/* implementation to get the Age of the user based on the selected birthdate from the calendar */
function calculateAge() {
  const selectedDate = new Date(document.getElementById("Birthday").value);
  const currentDate = new Date();
  const age = Math.floor(
    (currentDate - selectedDate) / (365.25 * 24 * 60 * 60 * 1000)
  );

  let difficulty = "";

  /* Difficulty Based on user's age */
  if (age <= 8) {
    difficulty = "Ludus";
  } else if (age <= 15) {
    difficulty = "Rhetor";
  } else {
    difficulty = "Philosopher";
  }

  document.getElementById("age").textContent = `Age: ${age} years`;
  document.getElementById("difficulty").textContent = `You are a ${difficulty}`;
}

flatpickr("#Birthday", {});
