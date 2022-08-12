'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct!!';

console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 10;

document.querySelector('.score').textContent = 13;
document.querySelector('.guess').value = 23;

*/

const messageOrg = document.querySelector('.message').textContent;
const numberOrg = document.querySelector('.number').textContent;
const bodyColorOrg = document.querySelector('body').style.backgroundColor;
const numberWidthOrg = document.querySelector('.number').style.width;
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = document.querySelector('.score').textContent;
let highscore = document.querySelector('.highscore').textContent;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// This can be deleted if tests are OK
// document.querySelector('.number').textContent = secretNumber;

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);

  document.querySelector('.message').textContent = messageOrg;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = numberOrg;
  document.querySelector('body').style.backgroundColor = bodyColorOrg;
  document.querySelector('.number').style.width = numberWidthOrg;
  document.querySelector('.guess').value = ' ';
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no imput
  if (guess === 0 || guess < 0) {
    document.querySelector('.message').textContent = 'Incorrect value!!';

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('Correct!!');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guess is different
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!!' : 'Too low!!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('Game Over!!!!');
      document.querySelector('.score').textContent = 0;
    }
  }

  // When gues is higher

  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too high!!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'Game Over!!!!';
  //     document.querySelector('.score').textContent = 0;
  //   }

  //   // When guess is low

  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too low!!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'Game Over!!!!';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});
