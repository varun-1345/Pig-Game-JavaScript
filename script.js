"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const holdDice = document.querySelector(".btn--hold");
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const playerHold = document.querySelector(".btn--hold");
const totalScore = document.querySelector(".score");
//Starting conditions

let scores, currentScore, activePlayer, playing;
const init = function () {
  //rolling dice functionality
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add("hidden");
  playerOne.classList.remove("player--winner");
  playerTwo.classList.remove("player--winner");
  playerOne.classList.add("player--active");
  playerTwo.classList.remove("player--active");
};
init();
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; // Reset current score to 0 for the current player
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle("player--active");
  playerTwo.classList.toggle("player--active");
}
rollDice.addEventListener("click", function () {
  if (playing) {
    //1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);
    //2.Display dice.
    diceEl.classList.remove("hidden");
    //Displaying dice images.
    diceEl.src = `dice-${dice}.png`; //important.
    //3. Check for rolled 1: if true,
    if (dice !== 1) {
      //Add dice to current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //not to concatenate.
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

playerHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      //Finish the Game.
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    switchPlayer();
  }
});
newGame.addEventListener("click", init);
