'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const mov = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  mov.forEach(function (movement, i) {
    const movementType = movement > 0 ? 'deposit' : 'withdrawal';
    const row = `
  <div class="movements__row">
    <div class="movements__type movements__type--${movementType}">${
      i + 1
    } ${movementType}</div>
    <div class="movements__date">2 days ago</div>
    <div class="movements__value">${movement}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', row);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return (acc += mov);
  }, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    const username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');

    acc.username = username;
  });
};

createUsernames(accounts);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => (acc += mov), 0);

  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => (acc += mov), 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((mov, i, arr) => mov >= 1)
    .reduce((acc, mov) => (acc += mov), 0);

  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Symarry
  calcDisplaySummary(acc);
};

// Event Handler after login

let currentUser;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentUser = accounts.find(acc => {
    if (acc.username === String(inputLoginUsername.value)) return acc;
  });

  if (currentUser?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome ${currentUser.owner.split(' ')[0]}`;
    document.querySelector('.app').style.opacity = 100;

    updateUI(currentUser);

    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
  }
});

// Transfer money

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const receiverAcc = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });
  const amount = Number(inputTransferAmount.value);

  console.log(receiverAcc, amount);

  // receiverAcc exists?
  // amount is lower than balance
  // amount is higher than 0
  // canot sent to yourself

  // addto receiverAcc array
  // remove from your array

  // empty fields
  // blur focus

  if (
    receiverAcc &&
    amount > 0 &&
    amount <= currentUser.balance &&
    receiverAcc.username !== currentUser.username
  ) {
    currentUser.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentUser);
    console.log('heloo');
    console.log(accounts);
  }

  inputTransferTo.value = inputTransferAmount.value = '';
});

// check if user is current
// chec if pins is appropreate

//remove account from accounts array
// hide UI.movements

// Delete account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentUser.username === inputCloseUsername.value &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    const accountIndex = accounts.findIndex(
      acc => acc.username === currentUser.username
    );
    accounts.splice(accountIndex, 1);
    document.querySelector('.app').style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// Borrow money
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmounut = Number(inputLoanAmount.value);

  // check if any deposit is 10% of loan amount

  const loanCheck = currentUser.movements.some(
    deposit => deposit >= loanAmounut * 0.1
  );

  if (loanCheck && loanAmounut > 0) {
    // push loan amount to movments array

    currentUser.movements.push(loanAmounut);

    // update UI

    updateUI(currentUser);
  }

  inputLoanAmount.value = '';
});

// Sort account movements

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentUser, !sorted);
  sorted = !sorted;
});

labelBalance.addEventListener('click', function () {
  const x = Array.from(
    document.querySelectorAll('.movements__value'),
    mov => mov.textContent
  );

  console.log(x);
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const { deposits, withdrawal } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (acc, value) => {
//       value > 0 ? (acc.deposits += value) : (acc.withdrawal += value);

//       return acc;
//     },
//     { deposits: 0, withdrawal: 0 }
//   );

// console.log(deposits, withdrawal);

// const capitalize = function (str) {
//   return str[0].toUpperCase() + str.slice(1);
// };

// const convertTitleCase = function (title) {
//   const exceptions = ['a', 'an', 'the', 'but', 'and', 'or', 'on', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');
//   return capitalize(titleCase);
// };

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  { weight: 32, curFood: 340, owners: ['Aichael'] },
];

// 1
dogs.forEach(function (dog) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

console.log(dogs);

// 2
const eatsTooMuch = function (dogs, owner) {
  const findObject = dogs.find(dog => dog.owners.includes(`${owner}`) === true);

  const minFood = findObject.recommendedFood * 0.9;
  const maxFood = findObject.recommendedFood * 1.1;

  if (minFood > findObject.curFood)
    console.log(`${owner}'s dog eats too little`);
  if (maxFood < findObject.curFood) console.log(`${owner}'s dog eats too much`);
  if (minFood < findObject.curFood && maxFood > findObject.curFood)
    console.log(`${owner}'s dog eats just right`);
};

eatsTooMuch(dogs, 'Alice');
eatsTooMuch(dogs, 'Matilda');
eatsTooMuch(dogs, 'Sarah');
eatsTooMuch(dogs, 'Michael');

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);
// 4

const stringMuch = ownersEatTooMuch.join(' and ');
const stringLittle = ownersEatTooLittle.join(' and ');

console.log(`${stringMuch}'s dogs eat too much!`);
console.log(`${stringLittle}'s dogs eat too much!`);

// 5

const exact = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(exact);

// 6

const okay = dogs.some(
  dog =>
    dog.curFood < dog.recommendedFood * 1.1 &&
    dog.curFood > dog.recommendedFood * 0.9
);
console.log(okay);

// 7

const eatingOkay = dogs
  .map(dog => dog)
  .filter(
    dog =>
      dog.curFood < dog.recommendedFood * 1.1 &&
      dog.curFood > dog.recommendedFood * 0.9
  );
console.log(eatingOkay);

// 8

// Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects 😉)

console.log(
  dogs.slice(' ').sort((a, b) => a.recommendedFood - b.recommendedFood)
);

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((acc, value) => acc + value, 0);

// console.log(bankDepositSum);

// const depositsOver1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

// const numDepositsOver1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, value) => (value >= 1000 ? acc + 1 : acc), 0);

// const { deposits, withdrawal } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (acc, value) => {
//       value > 0 ? (acc.deposits += value) : (acc.withdrawal += value);
//       return acc;
//     },
//     { deposits: 0, withdrawal: 0 }
//   );

// console.log(deposits, withdrawal);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const x = new Array(7);

// console.log(movements, x);

// x.fill(1, 2, 4);

// console.log(movements, x);

// const y = Array.from({ length: 7 }, () => 1);
// const z = Array.from({ length: 10 }, (_, i) => i + 1);

// console.log(y, z);

// console.log(movements.sort((a, b) => a - b));

// console.log(movements.find(mov => mov < 0));

// const accountOld = function (accounts) {
//   for (const acc of accounts) {
//     if (acc.owner === 'Jessica Davis') return acc;
//   }
// };

// console.log(accountOld(accounts));

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');

// console.log(account);

// document.addEventListener('click', function (event) {
//   console.log(event);
// });

// const eurToUsd = 1.1;

// const totalDepositsUsd = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, value) => (acc += value), 0);

// const totalDepositsEur = movements
//   .filter(mov => mov > 0)
//   .reduce((acc, value) => (acc += value), 0);

// console.log(totalDepositsUsd);
// const data1 = [5, 2, 4, 1, 15, 8, 3];
// const data2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const dogAgeInHumanYears = ages.map(age =>
//     age <= 2 ? 2 * age : 16 + age * 4
//   );

//   const onlyAdults = dogAgeInHumanYears.filter(age => age > 18);

//   const averageHumanAge =
//     onlyAdults.reduce((acc, age) => (acc += age), 0) / onlyAdults.length;

//   console.log(ages);
//   console.log(dogAgeInHumanYears);
//   console.log(onlyAdults);
//   console.log(averageHumanAge);
// };

// calcAverageHumanAge(data1);
// calcAverageHumanAge(data2);

// const data1 = [5, 2, 4, 1, 15, 8, 3];
// const data2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const averageHumanAge = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age > 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

//   console.log(averageHumanAge);
// };

// calcAverageHumanAge(data1);
// calcAverageHumanAge(data2);
// const max = movements.reduce(
//   (acc, move) => (acc > move ? acc : move),
//   movements[0]
// );

// console.log(max);

// const min = movements.reduce(function (acc, mov) {
//   if (acc < mov) return acc;
//   return mov;
// }, movements[0]);

// console.log(min);
// const balance = movements.reduce((acc, mov) => (acc += mov), 0);

// console.log(balance);

// const deposits = movements.filter(function (movement) {
//   return movement > 0;
// });

// console.log(deposits);

// const withdrawal = movements.filter(move => move < 0);

// console.log(withdrawal);

// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// for (const [i, move] of movements.entries()) {
//   if (move > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${move}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(move)}`);
//   }
// }

// const mappedMovements = account1.movements.map(
//   (move, i) =>
//     `Movement ${i + 1}: ${
//       move > 0 ? 'You deposited' : 'You withdrew'
//     } ${Math.abs(move)}`
// );

// console.log(mappedMovements);

// const julia = [9, 16, 6, 8, 3];
// const kate = [10, 5, 6, 1, 4];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrection = dogsJulia.slice().splice(1).slice(0, -2);

//   const togetherData = dogsJuliaCorrection.concat(dogsKate);

//   togetherData.forEach(function (dog, i) {
//     const dogStage = dog <= 3 ? 'puppy' : 'adult';

//     if (dogStage === 'puppy') {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     } else {
//       console.log(`"Dog number ${i + 1} is an adult, and is ${dog} years old"`);
//     }
//   });
// };

// checkDogs(julia, kate);

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2, 4));
// console.log(arr.slice(2));
// console.log(arr.slice(-1));
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(2, -1));
// console.log(arr.slice());
// console.log([...arr]);

// // console.log(arr.splice(2));
// // console.log(arr.splice(-1));
// console.log(arr.splice(2, 3));
// console.log(arr);

// let arr2 = ['j', 'i', 'h', 'g', 'f'];

// console.log(arr2.slice(-1)[0]);

// console.log('aljosa'.at(-1));

// console.log('----------------------------------FOREACH');
// movements.forEach(function (move, i, array) {
//   if (move > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${move}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(move)}`);
//   }
// });

// movements.forEach(function (move, i) {
//   console.log(`${i + 1}: ${move}`);
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value} `);
// });
