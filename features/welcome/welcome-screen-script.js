/* implementation to get the Age of the user based on the selected birthdate from the calendar */
function calculateAge() {
  const selectedDate = new Date(document.getElementById("birthday").value);
  const currentDate = new Date();
  const age = Math.floor(
    (currentDate - selectedDate) / (365.25 * 24 * 60 * 60 * 1000)
  );
  return age;
}

const getDifficulty = (age) => {
  let difficulty = "";

  /* Difficulty Based on user's age */
  if (age <= 8) {
    difficulty = "Ludus";
  } else if (age <= 15) {
    difficulty = "Rhetor";
  } else {
    difficulty = "Philosopher";
  }
};
flatpickr("#birthday", {});

const onStart = () => {
  console.log("onStart function is called");
  try {
    let birthday = document.getElementById("birthday").value;
    let username = document.getElementById("username").value;
    let gender = document.getElementById("gender").value;
    let age = calculateAge();
    if (birthday === "" || username === "" || gender === "") {
      alert("Please fill out all details");
      throw "Information is empty";
    }
    if (age < 4) {
      document.getElementById("age-restriction-container").hidden = false;
      document.getElementById("main-container").hidden = true;
      console.log("Redirecting to age restriction page.");
      return;
    } else {
      document.getElementById("main-container").hidden = true;
      document.getElementById("valid-age-container").hidden = false;
      console.log("User Meets Age Requirement");

      setTimeout(() => {
        document.getElementById("word-from-the-makers").style.display = "none";
        document
          .getElementById("safe-and-private-gaming")
          .removeAttribute("hidden");
      }, 5000);
    }
    sessionStorage.setItem(
      "userInformation",
      JSON.stringify({
        name: username,
        birthday: birthday,
        gender: gender,
        age: calculateAge(),
      })
    );
  } catch (e) {
    console.log("Invalid Information | Error:", e);
    return;
  }
  console.log("start pressed and condition passed");
  const test = sessionStorage.getItem("userInformation");
  console.log(JSON.parse(test));
};
