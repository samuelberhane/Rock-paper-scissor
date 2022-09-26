const chooses = ["Rock", "Paper", "Scissor"];
const images = ["✊", "✋", "✌"];
const startBtn = document.getElementById("start-btn");
let selections = document.querySelectorAll(".choose");
let playerChoice = document.querySelector(".player-choice");
let computerChoice = document.querySelector(".computer-choice");
let roundResult = document.querySelector(".round-result");
let playerResult = document.querySelector(".player-result");
let computerResult = document.querySelector(".computer-result");
let finalWinner = document.querySelector(".final-winner");
let playerScore = 0;
let computerScore = 0;
let playerSelection;
let computerSelection;
let round = 0;

finalWinner.addEventListener("click", startGame);

function startGame() {
  playerScore = 0;
  computerScore = 0;
  round = 0;
  roundResult.innerHTML = `
  <h3>Round 0:</h3>
  <h1></h1>
  `;
  playerChoice.textContent = "";
  computerChoice.textContent = "";
  playerResult.textContent = playerScore;
  computerResult.textContent = computerScore;
  finalWinner.classList.add("start");
  finalWinner.classList.remove("reset");
  startBtn.remove();
}

selections.forEach((selection) => {
  selection.addEventListener("click", () => {
    if (playerScore < 5 && computerScore < 5) {
      round++;
      playerSelection = selection.dataset.select;
      computerSelection = getComputerSelection();
      clickEffect(selection);
      playerChoice.textContent = displaySelection(playerSelection);
      computerChoice.textContent = displaySelection(computerSelection);
      let roundWinner = getRoundWinner(playerSelection, computerSelection);
      updateRoundScore(roundWinner);
      displayRoundWinner(
        roundWinner,
        round,
        playerSelection,
        computerSelection
      );
      playerResult.textContent = playerScore;
      computerResult.textContent = computerScore;

      if (playerScore == 5) {
        playerWin();
        finalWinner.classList.add("reset");
        finalWinner.classList.remove("start");
      } else if (computerScore == 5) {
        computerWin();
        finalWinner.classList.add("reset");
        finalWinner.classList.remove("start");
      }
      let restart = finalWinner.querySelector(".restart");
      restart.addEventListener("click", startGame);
    }
  });
});

function playerWin() {
  finalWinner.innerHTML = `<h2>Congratulations! You Won</h2>
  <button class="restart">Play Again?</button>`;
}

function computerWin() {
  finalWinner.innerHTML = `<h2>You Lost</h2>
  <button class="restart">Play Again?</button>`;
}

function clickEffect(selection) {
  selection.classList.add("display");
  setTimeout(() => {
    selection.classList.remove("display");
  }, 300);
}

function displayRoundWinner(
  roundWinner,
  round,
  playerSelection,
  computerSelection
) {
  switch (roundWinner) {
    case "Player":
      roundResult.innerHTML = `
      <h3>Round ${round}: <span> ${playerSelection} Beats ${computerSelection}</span></h3>
      <h2>Player Beats Computer</h2>
      `;
      break;
    case "Computer":
      roundResult.innerHTML = `
        <h3>Round ${round}: <span> ${computerSelection} Beats ${playerSelection}</span></h3>
        <h2>Computer Beats Player</h2>
        `;
      break;
    case "Tie":
      roundResult.innerHTML = `
        <h3>Round ${round}:<span>  ${playerSelection} Equals ${computerSelection}</span></h3>
        <h2>Tie</h2>
        `;
      break;
  }
}

function updateRoundScore(roundWinner) {
  switch (roundWinner) {
    case "Player":
      playerScore++;
      break;
    case "Computer":
      computerScore++;
      break;
  }
}

function getRoundWinner(playerSelection, computerSelection) {
  if (
    (playerSelection == "Paper" && computerSelection == "Rock") ||
    (playerSelection == "Rock" && computerSelection == "Scissor") ||
    (playerSelection == "Scissor" && computerSelection == "Paper")
  )
    return "Player";
  else if (playerSelection == computerSelection) return "Tie";
  else return "Computer";
}

function displaySelection(selection) {
  switch (selection) {
    case "Rock":
      return images[0];
    case "Paper":
      return images[1];
    case "Scissor":
      return images[2];
  }
}

function getComputerSelection() {
  return chooses[Math.floor(Math.random() * chooses.length)];
}
