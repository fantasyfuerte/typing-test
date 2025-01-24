const $time = document.querySelector("time");
const $paragraph = document.querySelector("p");
const $input = document.querySelector("input");

const INITIAL_TIME = 30;

const text =
  "the quick brown fox jumps over the lazy dog and then the dog jumps over the lazy fox right after the fox jumps over the lazy dog but then a frog jumps into the scene to see what happens";

let words = [];
let currentTime = INITIAL_TIME;

initGame();
initEvents();

function initGame() {
  words = text.split(" ").slice(0, 32);
  currentTime = INITIAL_TIME;
  $time.textContent = currentTime;

  $paragraph.innerHTML = words
    .map((word, index) => {
      const letters = word.split("");
      return `<word>
    ${letters.map((letter) => `<letter>${letter}</letter>`).join("")}
    </word>`;
    })
    .join("");

  const $firstWord = $paragraph.querySelector("word");
  $firstWord.classList.add("active");
  $firstWord.querySelector("letter").classList.add("active");

  const interval = setInterval(() => {
    currentTime--;
    $time.textContent = currentTime;
    if (currentTime === 0) {
      clearInterval(interval);
      gameOver();
    }
  }, 1000);
}
function initEvents() {
  document.addEventListener("keydown", (e) => {
    $input.focus();
    $input.addEventListener("keydown", onKeyDown);
    $input.addEventListener("keyup", onKeyUp);
  });
}

function onKeyDown(e) {
  const $currentWord = $paragraph.querySelector("word.active");
  const $currentLetter = $currentWord.querySelector("letter.active");
  const { key } = e;
  if (key === " ") {
    e.preventDefault();
    const $nextWord = $currentWord.nextElementSibling;
    const $nextLetter = $nextWord.querySelector("letter");
    const $input = document.querySelector("input");

    $currentWord.classList.remove("active", "marked");
    $currentLetter.classList.remove("active");

    $nextWord.classList.add("active");
    $nextLetter.classList.add("active");

    $input.value = "";

    const hadMissedLetters =
      $currentWord.querySelectorAll("letter:not(.correct)").length > 0;

    const classToAdd = hadMissedLetters ? "marked" : "correct";
    $currentWord.classList.add(classToAdd);
  }
  if (key === "Backspace") {
    const $prevWord = $currentWord.previousElementSibling;
    const $prevLetter = $currentLetter.previousElementSibling;

    if (!$prevWord && !$prevLetter) {
      e.preventDefault();
      return;
    }
    const $wordMarked = $paragraph.querySelector("word.marked");
    if ($wordMarked && !$prevLetter) {
      e.preventDefault();
      $prevWord.classList.remove("marked");
      $prevWord.classList.add("active");
    }
  }
}

function onKeyUp() {
  const $currentWord = $paragraph.querySelector("word.active");
  const $currentLetter = $currentWord.querySelector("letter.active");
  const currentWord = $currentWord.innerText.trim();
  $input.maxLength = currentWord.length;

  const $allLetters = $currentWord.querySelectorAll("letter");
  $allLetters.forEach((letter) =>
    letter.classList.remove("correct", "incorrect")
  );

  $input.value.split("").forEach((letter, index) => {
    const $letter = $allLetters[index];
    const letterToCheck = currentWord[index];

    const isCorrect = letter === letterToCheck;
    const letterClass = isCorrect ? "correct" : "incorrect";
    $letter.classList.add(letterClass);
  });
  $currentLetter.classList.remove("active", "is-last");
  const inputValueLength = $input.value.length;
  const $nextActiveLetter = $allLetters[inputValueLength];
  if ($nextActiveLetter) {
    $nextActiveLetter.classList.add("active");
  } else {
    $currentLetter.classList.add("active", "is-last");
  }
}

function gameOver() {}
