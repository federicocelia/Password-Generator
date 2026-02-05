// Character pools used to build passwords.
// Each key represents a "category" that can be included in the generated password.
const characters = {
  // Digits 0–9
  number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

  // Symbols allowed in passwords
  symbol: [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "'",
    '"',
    "\\",
    "|",
    ",",
    ".",
    "<",
    ">",
    "/",
    "?",
  ],

  // Lowercase + uppercase letters A–Z
  letters: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
};

// Cache the start button element (the button that triggers password generation).
const startBtn = document.querySelector("#start-btn");

// Announces status messages to screen readers
const announceStatus = (message) => {
  const statusEl = document.querySelector("#status");
  if (!statusEl) return;

  statusEl.textContent = "";
  setTimeout(() => {
    statusEl.textContent = message;
  }, 10);
};

// Utility: returns a random integer from 0 up to (range - 1).
const randomNumber = (range) => {
  return Math.floor(Math.random() * range);
};

// Generates a password based on user options.
// passwordLength: length of password to generate
// includeNumbers: whether numbers can appear
// includeSymbols: whether symbols can appear
// onlyNumeric: if true, password is digits only (overrides other options)
const generatePassword = (
  passwordLength,
  includeNumbers,
  includeSymbols,
  onlyNumeric,
) => {
  // Get available character-category keys: ["number", "symbol", "letters"]
  let keys = Object.keys(characters);

  // Pick a random category key to start with
  let randomKey = keys[randomNumber(keys.length)];

  // Precompute the length of that category array for random indexing
  let lengthofkeyarray = characters[randomKey].length;

  let password = [];

  if (onlyNumeric) {
    const numarr = characters["number"].length;

    // Add random digits until we reach the desired password length.
    for (let i = 0; i < passwordLength; i++) {
      password.push(characters["number"][randomNumber(numarr)]);
    }

    // Convert array of characters into a final string password.
    return password.join("");
  } else if (!onlyNumeric) {
    // Otherwise: generate password based on includeNumbers/includeSymbols flags.

    // Case 1:
    // This allows all keys (number, symbol, letters) to be chosen.
    if (includeNumbers && includeSymbols) {
      for (let i = 0; i < passwordLength; i++) {
        // Re-pick a random category each character
        randomKey = keys[randomNumber(keys.length)];
        lengthofkeyarray = characters[randomKey].length;

        // Pick a random character from the chosen category and push it
        password.push(characters[randomKey][randomNumber(lengthofkeyarray)]);
      }

      // Case 2:
      // Keep re-rolling category while it is "symbol".
    } else if (includeNumbers && !includeSymbols) {
      for (let i = 0; i < passwordLength; i++) {
        randomKey = keys[randomNumber(keys.length)];

        // Exclude symbols by rerolling until category isn't "symbol"
        while (randomKey === "symbol") {
          randomKey = keys[randomNumber(keys.length)];
        }

        lengthofkeyarray = characters[randomKey].length;
        password.push(characters[randomKey][randomNumber(lengthofkeyarray)]);
      }

      // Case 3:
      // Keep re-rolling category while it is "number".
    } else if (!includeNumbers && includeSymbols) {
      for (let i = 0; i < passwordLength; i++) {
        randomKey = keys[randomNumber(keys.length)];

        // Exclude numbers by rerolling until category isn't "number"
        while (randomKey === "number") {
          randomKey = keys[randomNumber(keys.length)];
        }

        lengthofkeyarray = characters[randomKey].length;
        password.push(characters[randomKey][randomNumber(lengthofkeyarray)]);
      }

      // Case 4:
      // Keep re-rolling until category is only letters.
    } else if (!includeNumbers && !includeSymbols) {
      for (let i = 0; i < passwordLength; i++) {
        randomKey = keys[randomNumber(keys.length)];

        // Exclude both symbols and numbers; allow only letters
        while (randomKey === "symbol" || randomKey === "number") {
          randomKey = keys[randomNumber(keys.length)];
        }

        lengthofkeyarray = characters[randomKey].length;
        password.push(characters[randomKey][randomNumber(lengthofkeyarray)]);
      }
    }

    // Final output as a string
    return password.join("");
  }
};

// Writes two generated passwords into the two output <p> elements.
function render(pw1, pw2) {
  document.querySelector("#password-1").textContent = pw1;
  document.querySelector("#password-2").textContent = pw2;
}

// Main handler for the "start" button: reads user settings, generates passwords, renders them,
// then enables click-to-copy on the generated outputs.
const handleCreatePassword = () => {
  // Read password length from input
  let passwordLength = Number(document.querySelector("#pass-length").value);

  // Read checkbox/radio state for options
  let includeNumbers = document.getElementById("number-yes").checked;
  let includeSymbols = document.getElementById("symbol-yes").checked;
  let onlyNumeric = document.getElementById("numeric-yes").checked;

  // Generate two passwords
  const password1 = generatePassword(
    passwordLength,
    includeNumbers,
    includeSymbols,
    onlyNumeric,
  );

  const password2 = generatePassword(
    passwordLength,
    includeNumbers,
    includeSymbols,
    onlyNumeric,
  );

  // Render them into the UI and attach copy handlers
  render(password1, password2);
  announceStatus("Two passwords generated.");
  copyPasswords();
};

// Attaches click handlers to each generated password so the user can copy it to the clipboard.
const copyPasswords = () => {
  // Cache the password output elements
  const pass1 = document.querySelector("#password-1");
  const pass2 = document.querySelector("#password-2");

  // On click: copy password 1 text
  pass1.addEventListener("click", () => {
    navigator.clipboard.writeText(pass1.textContent);
    announceStatus("Password 1 copied.");

    // If the "copied" message for password 1 does not exist yet, append it
    if (!document.querySelector("#copied1")) {
      pass1.insertAdjacentHTML(
        "beforeend",
        `<p class="copied" id="copied1">Password Copied</p>`,
      );
    }
  });

  // On click: copy password 2 text
  pass2.addEventListener("click", () => {
    navigator.clipboard.writeText(pass2.textContent);
    announceStatus("Password 2 copied.");

    // If the "copied" message for password 2 does not exist yet, append it
    if (!document.querySelector("#copied2")) {
      pass2.insertAdjacentHTML(
        "beforeend",
        `<p class="copied" id="copied2">Password Copied</p>`,
      );
    }
  });
};

// Resets the password output container back to two empty <p> placeholders.
const resetPassword = () => {
  document.querySelector(".generated-passwords").innerHTML = `     
    <p id="password-1" class="generated"></p>
    <p id="password-2" class="generated"></p>
    `;
};

// Event listener on the start button so clicking it generates new passwords.
startBtn.addEventListener("click", handleCreatePassword);
