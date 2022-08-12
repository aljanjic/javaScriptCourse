'use strict';

// Selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const diceEl = document.querySelector('.dice');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let currentScore, score, activePlayer, playing;

const initFunc = function () {
  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
};

initFunc();
// Player pressed roll the dice button
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generate random number
    const dice = Math.trunc(Math.random() * 6 + 1);
    // 2.Display generated number
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    // 3. If roll is not 1, add dice role to current score

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      // display new score, switch player
    } else {
      switchPlayer();
    }
  }
});

// Player pressed Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to total score
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    // // if score >= 100 win the game
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // else switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initFunc);
