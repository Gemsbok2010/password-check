const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

function myFunction() {
  const password = document.querySelector(".password").value;
  if (password === "henryshen") {
    document.querySelector(".backdrop").style.display = "none";
    password = null;
  }
}

passwordInput.addEventListener("keyup", updateStrengthMeter);
updateStrengthMeter();

function updateStrengthMeter() {
  const weaknesses = calculatePasswordStrength(passwordInput.value);

  reasonsContainer.innerHTML = "";
  weaknesses.forEach((weakness) => {
    if (weakness == null) {
      return;
    }

    const messageElement = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    reasonsContainer.appendChild(messageElement);
    reasonsContainer.appendChild(checkbox);

    checkbox.checked = weakness.checked;
    messageElement.innerText = weakness.message;
  });

  strengthMeter.style.setProperty("--strength", strength);
}

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowerCaseWeakness(password));
  weaknesses.push(upperCaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharactersWeakness(password));
  return weaknesses;
}

function lowerCaseWeakness(password) {
  return characterTypeWeakness(
    password,
    /[a-z]/g,
    "lower case character",
    false
  );
}
function upperCaseWeakness(password) {
  return characterTypeWeakness(
    password,
    /[A-Z]/g,
    "upper case character",
    false
  );
}

function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, "numbers", false);
}

function specialCharactersWeakness(password) {
  return characterTypeWeakness(
    password,
    /[#$%!@&()]/g,
    "special character",
    false
  );
}

function lengthWeakness(password) {
  const length = password.length;
  if (length <= 8) {
    return {
      message: "Your password is too short",
      checked: false,
    };
  } else {
    return {
      message: "Your password has met minimum characters.",
      checked: true,
    };
  }
}

function characterTypeWeakness(password, regex, type, bool) {
  const matches = password.match(regex) || [];
  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
      checked: bool,
    };
  } else {
    return {
      message: `You have ${type}`,
      checked: !bool,
    };
  }
}
