const $time = document.querySelector("time");
const $paragraph = document.querySelector("p");
const $input = document.querySelector("input");

const INITIAL_TIME = 30;

const text =
  "The quick brown fox jumps over the lazy dog and then the dog jumps over the lazy fox right after the fox jumps over the lazy dog but then a frog jumps into the scene to see what happens";

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

  const interval = setInterval(() => {
    currentTime--;
    $time.textContent = currentTime;
    if (currentTime === 0) {
      clearInterval(interval);
    }
  }, 1000);
}
function initEvents() {}
