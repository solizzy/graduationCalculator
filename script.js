/*
  Graduation Calculator v1.0.0
  https://github.com/solizzy/graduationCalculator

  See https://codepen.io/isabroch/pen/LYxLZwj for how to use.
*/

document.addEventListener("DOMContentLoaded", graduationCalculator);

function graduationCalculator() {
  const today = new Date();

  function handleSubmit(e) {
    e.preventDefault();

    const birthString = new FormData(e.target).get("birthdate");
    const outputEl = document.querySelector("#rpg-output");
    const age = calculateAge(birthString);
    const { firstYear, graduateYear } = calculateGradYear(birthString);

    outputEl.innerHTML = `You are <b>${age}</b>. You started school year <b>${firstYear}</b> and graduated year <b>${graduateYear}</b>.`;

    return false;
  }

  function padNum(num, targetLength) {
    return num.toString().padStart(targetLength, 0);
  }

  function setMaxDate(date = new Date()) {
    const dateString = `${date.getFullYear()}-${padNum(
      date.getMonth() + 1,
      2
    )}-${padNum(date.getDate(), 2)}`;
    document.querySelector("#rpg-birthdate").setAttribute("max", dateString);
  }

  function calculateAge(dateString) {
    const birth = new Date(dateString);
    const monthDiff = today.getMonth() - birth.getMonth();
    let age = today.getFullYear() - birth.getFullYear();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  function calculateGradYear(
    dateString,
    { yearCutoff = [08, 31], schoolYears = 7, startAge = 11 } = {}
  ) {
    const [birthYear, birthMonth, birthDate] = dateString
      .split("-")
      .map((string) => parseInt(string));

    let firstYear = birthYear + startAge;

    const hasCutoffBirthday =
      birthMonth > yearCutoff[0] ||
      (birthMonth === yearCutoff[0] && birthDate >= yearCutoff[1]);

    if (hasCutoffBirthday) {
      firstYear++;
    }

    const graduateYear = firstYear + schoolYears;

    return { firstYear, graduateYear };
  }

  // on load
  setMaxDate();

  document
    .querySelector("#rpg-calculator")
    .addEventListener("submit", handleSubmit);
}
