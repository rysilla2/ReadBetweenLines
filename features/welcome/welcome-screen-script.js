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
  document.location.href =
    document.location.origin + "/features/welcome/age-restriction.html"; //STILL NOT WORKING
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
      console.log("Redirecting to age restriction page.");
      return;
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
