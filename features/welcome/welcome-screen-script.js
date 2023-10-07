function calculateAge() {
  const selectedDate = new Date(document.getElementById("Birthday").value);
  const currentDate = new Date();
  const age = Math.floor(
    (currentDate - selectedDate) / (365.25 * 24 * 60 * 60 * 1000)
  );
  document.getElementById("age").textContent = `Age: ${age} years`;
}

flatpickr("#Birthday", {});