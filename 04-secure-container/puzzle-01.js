const input = "138307-654504";
const start = parseInt(input.split("-")[0]);
const end = parseInt(input.split("-")[1]);

// FIRST PART
const checkFirstPart = password => {
  // array with ints
  const digits = password
    .toString()
    .split("")
    .map(n => Number(n));

  // never decreases
  for (let i = 1; i < 6; i++) {
    if (digits[i] < digits[i - 1]) {
      return false;
    }
  }

  // check for pairs
  for (let i = 1; i < 6; i++) {
    if (digits[i] == digits[i - 1]) {
      return true;
    }
  }
};

// MAIN EXECUTION PART 1
const passwords = [];

for (let password = start; password <= end; password++) {
  if (checkFirstPart(password)) {
    passwords.push(password);
  }
}

// LOGGING RESULTS
console.log("NUMBER OF POSSIBLE PASSWORDS: ", passwords.length);
