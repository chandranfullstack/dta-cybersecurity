export const REGULAR = "Daimler CS Regular";

export const BOLD = "Daimler CS Bold";

// ROUTES PATH

export const HOME_ROUTE = "/cyber";

export const DASHBOARD_ROUTE = "/dashboard";

export const SIGNIN_ROUTE = "/signin";

export const WELCOME_ROUTE = "/welcome";

export const QUESTION_ROUTE = (quizID = "") =>
  `/question/${quizID || ":quizID"}`;

export const RESULT_ROUTE = (quizID = "") => `/result/${quizID || ":quizID"}`;

export const KNOWLEDGEHUB_ROUTE = "/knowledge-hub";

export const CONCRETE_CASES_LIST_ROUTE = "/concrete-cases";

export const CONCRETE_CASES_DETAIL_ROUTE = (id = "") =>
  `/concrete-cases/${id || ":id"}`;

export const PASSWORD_GENERATOR_ROUTE = "/password-generator";

export const PASSWORD_SECURITY_CHECKER_ROUTE = "/password-security-checker";

export const REPORTS_ROUTE="/reports"

// FUNCTIONALITY

// PASSWORD GENERATOR

export const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

export function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  // Doesn't have a selected type
  if (typesCount === 0) {
    lower = true;
    upper = true;
    number = true;
    symbol = true;
  }
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  // create a loop
  for (let i = 0; i < length; i++) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

export function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

export function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

export function getRandomNumber() {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789012345678901234567890123456789";
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

// function onlyLettersAndNumbers(str) {
//   return /^[A-Za-z0-9]*$/.test(str);
// }

export function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// CONTENT

export const quotes = [
  "Stronger passwords use different types of characters",
  "Avoid sequences or repeated characters in your passwords",
  "Don’t simply change e’s for 3′s, a’s for 4′s etc. These are well-established password tricks which any hacker will be familiar with",
  "Avoid the use of dictionary words or common names, and avoid using any personal information",
  "When adding a capital or digit to your password, don’t simply put the capital at the start and the digit at the end",
  "It’s often better to have longer passwords than shorter, more complex ones",
  "Try to make your passwords at least 15 characters long",
  "Avoid single words, or a word preceded or followed by a single number",
  "Don’t use information in your password that others might know about you or that’s in your social media",
];

export const reviewData = [
  "Oh dear, using that password is like leaving your front door wide open.",
  "Oops, using that password is like leaving your key in the lock.",
  "Hmm, using that password is like locking your front door, but leaving the key under the mat.",
  "Good, using that password is like locking your front door and keeping the key in a safety deposit box. ",
  "Fantastic, using that password makes you as secure as Fort Knox.",
  "",
];
