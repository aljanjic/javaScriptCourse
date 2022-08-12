"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Aljosa Janjic",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Sofija Stokic",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Marko Markovic",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Petar Peric",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const mov = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  mov.forEach(function (movement, i) {
    const movementType = movement > 0 ? "deposit" : "withdrawal";
    const row = `
  <div class="movements__row">
    <div class="movements__type movements__type--${movementType}">${
      i + 1
    } ${movementType}</div>
    <div class="movements__date">2 days ago</div>
    <div class="movements__value">${movement}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", row);
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
      .split(" ")
      .map((name) => name[0])
      .join("");

    acc.username = username;
  });
};

createUsernames(accounts);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => (acc += mov), 0);

  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => (acc += mov), 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
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

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentUser = accounts.find((acc) => {
    if (acc.username === String(inputLoginUsername.value)) return acc;
  });

  if (currentUser?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome ${currentUser.owner.split(" ")[0]}`;
    document.querySelector(".app").style.opacity = 100;

    updateUI(currentUser);

    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
  }
});

// Transfer money

btnTransfer.addEventListener("click", function (e) {
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
    console.log("heloo");
    console.log(accounts);
  }

  inputTransferTo.value = inputTransferAmount.value = "";
});

// check if user is current
// check if pins are appropreate

//remove account from accounts array
// hide UI.movements

// Delete account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentUser.username === inputCloseUsername.value &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    const accountIndex = accounts.findIndex(
      (acc) => acc.username === currentUser.username
    );
    accounts.splice(accountIndex, 1);
    document.querySelector(".app").style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

// Borrow money
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmounut = Number(inputLoanAmount.value);

  // check if any deposit is 10% of loan amount

  const loanCheck = currentUser.movements.some(
    (deposit) => deposit >= loanAmounut * 0.1
  );

  if (loanCheck && loanAmounut > 0) {
    // push loan amount to movments array

    currentUser.movements.push(loanAmounut);

    // update UI

    updateUI(currentUser);
  }

  inputLoanAmount.value = "";
});

// Sort account movements

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentUser, !sorted);
  sorted = !sorted;
});
movementType;
labelBalance.addEventListener("click", function () {
  const x = Array.from(
    document.querySelectorAll(".movements__value"),
    (mov) => mov.textContent
  );

  console.log(x);
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
