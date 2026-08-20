const letters = ["E","F","P","T","O","Z","L","D","C","H","N","K","R","V","S"];
const sizes = [130,104,82,64,50,39,30,23];
const totalPerEye = sizes.length;
let eye = "right";
let round = 0;
let correct = 0;
let target = "";
const results = { right: 0, left: 0 };

const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const testArea = document.querySelector("#test-area");
const intro = document.querySelector(".intro");
const info = document.querySelector("#info");
const optotype = document.querySelector("#optotype");
const choices = document.querySelector("#choices");
const eyeTitle = document.querySelector("#eye-title");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const dialog = document.querySelector("#result-dialog");

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function newTarget() {
  const previous = target;
  do target = letters[Math.floor(Math.random() * letters.length)];
  while (target === previous);

  optotype.style.opacity = "0";
  setTimeout(() => {
    optotype.textContent = target;
    optotype.style.fontSize = sizes[round] + "px";
    optotype.style.opacity = "1";
  }, 120);

  const alternatives = shuffle(letters.filter(letter => letter !== target)).slice(0, 4);
  choices.innerHTML = "";
  shuffle([target, ...alternatives]).forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.setAttribute("aria-label", `Letra ${letter}`);
    button.addEventListener("click", () => answer(letter === target));
    choices.appendChild(button);
  });

  const completed = (eye === "left" ? totalPerEye : 0) + round;
  progressLabel.textContent = `${completed + 1} de ${totalPerEye * 2}`;
  progressBar.style.width = `${(completed / (totalPerEye * 2)) * 100}%`;
}

function answer(isCorrect) {
  if (isCorrect) correct++;
  round++;

  if (round < totalPerEye) {
    newTarget();
    return;
  }

  results[eye] = correct;
  if (eye === "right") {
    eye = "left";
    round = 0;
    correct = 0;
    eyeTitle.textContent = "Olho esquerdo";
    alert("Agora cubra o olho direito e deixe o olho esquerdo aberto.");
    newTarget();
  } else {
    showResult();
  }
}

function showResult() {
  progressBar.style.width = "100%";
  document.querySelector("#right-score").textContent = `${results.right}/8`;
  document.querySelector("#left-score").textContent = `${results.left}/8`;

  const lowest = Math.min(results.right, results.left);
  const difference = Math.abs(results.right - results.left);
  let message = "Você identificou a maior parte das linhas com os dois olhos.";
  if (lowest <= 4) message = "Você teve dificuldade em várias linhas. Vale agendar uma avaliação oftalmológica.";
  else if (difference >= 3) message = "Houve uma diferença perceptível entre os olhos. Uma avaliação profissional é recomendada.";

  document.querySelector("#result-message").textContent = message;
  dialog.showModal();
}

function start() {
  eye = "right";
  round = 0;
  correct = 0;
  results.right = 0;
  results.left = 0;
  eyeTitle.textContent = "Olho direito";
  intro.classList.add("hidden");
  info.classList.add("hidden");
  testArea.classList.remove("hidden");
  dialog.close();
  window.scrollTo({ top: 0, behavior: "smooth" });
  newTarget();
}

startBtn.addEventListener("click", start);
restartBtn.addEventListener("click", start);
document.querySelector("#cant-see").addEventListener("click", () => answer(false));
dialog.addEventListener("cancel", event => event.preventDefault());