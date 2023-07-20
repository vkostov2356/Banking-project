"use strict";

// TRANSACTION PAGE **********************************

// IMPORTS

import { account1 } from "./accounts.mjs";
import { account2 } from "./accounts.mjs";
import { account3 } from "./accounts.mjs";
import { account4 } from "./accounts.mjs";
import { createUsernames } from "./accounts.mjs";
const accounts = JSON.parse(localStorage.getItem("accounts"));

if (localStorage.getItem("updatedAccounts")) {
  var updatedAccounts = JSON.parse(localStorage.getItem("updatedAccounts"));
  createUsernames(updatedAccounts);
} else {
  var updatedAccounts = accounts;
  createUsernames(updatedAccounts);
}

// SELECTORS

const currentAccount = JSON.parse(localStorage.getItem("storageName"));

const btnLogOut = document.querySelector(".logout-btn");

const labelWelcome = document.querySelectorAll(".users-name");
const labelCurrDate = document.querySelector(".date");
const currDate = new Date();

const btnUpgrade = document.querySelector(".upgrade-to-premium");
const modalPremium = document.querySelector(".modal-pricing");
const overlay = document.querySelector(".overlay");

const containerMovements = document.querySelector(".movements");

const currBalance = document.querySelector(".balance-value");
const labelIn = document.querySelector(".amount-in");
const labelOut = document.querySelector(".amount-out");
const labelCashback = document.querySelector(".amount-cb");

const upgradeText = document.querySelector(".upgrade-text");
const upgradeTab = document.querySelector(".upgrade");
const startNowStarter = document.querySelector(".start-now-starter");
const startNowPremium = document.querySelector(".start-now-premium");
const starterPlanCard = document.querySelector(".starter-plan-card");
const starterWelcome = document.querySelector(".starter-welcome");
const premiumWelcome = document.querySelector(".premium-welcome");
const btnWelcomePlan = document.querySelectorAll(".finish-update");

const liveChat = document.querySelector(".modal-chat");
const siteMsg1 = document.querySelector(".site1");
const siteMsg2 = document.querySelector(".site2");
const userMsg = document.querySelector(".user");
const userTab = document.querySelector(".user-message");
const inputMessage = document.querySelector(".user-input-msg");
const btnMessageSubmit = document.querySelector(".live-chat-btn");

const ctaDepositInput = document.querySelector(".add-money-input");
const ctaDepositLoanRequest = document.querySelector(".add-money-select");
const btnDepositSubmit = document.querySelector(".submit-deposit-loan");

const ctaTransferUser = document.querySelector(".transfer-input-un");
const ctaTransferPin = document.querySelector(".transfer-input-pin");
const ctaTransferAmount = document.querySelector(".transfer-input-amount");
const btnTransferSubmit = document.querySelector(".submit-transfer");

const ctaClosureUser = document.querySelector(".close-account-input-un");
const ctaClosurePin = document.querySelector(".close-account-input-pass");
const ctaClosureReason = document.querySelector(".close-account-select");
const btnClosureSubmit = document.querySelector(".submit-closure");

const timerS = document.querySelector(".timer");
// FUNCTIONS

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    let html;

    html = `
      <div class="movements-row">
        <div class="movements-type movements-type-${type}">${type}</div>
        <div class="movements-value"><span>$</span> ${Math.abs(mov)}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const openPremiumModal = function (e) {
  e.preventDefault();
  if (currentAccount.premium) {
    showFirstMessage();
  } else {
    modalPremium.classList.remove("modal-hidden");
    overlay.classList.remove("modal-hidden");
  }
  clearInterval(timer);
};

const displayIn = function (acc) {
  let depositsValue = [];

  acc.movements.forEach((movement) => {
    if (movement > 0) {
      depositsValue.push(movement);
    }

    acc.totalDeposits = depositsValue.reduce((a, b) => a + b, 0);
  });

  labelIn.textContent = acc.totalDeposits;
};

const displayOut = function (acc) {
  let withdrawalValue = [];

  acc.movements.forEach((movement) => {
    if (movement < 0) {
      withdrawalValue.push(movement);
    }

    acc.totalWithdrawals = withdrawalValue.reduce((a, b) => a + b, 0);
  });
  labelOut.textContent = Math.abs(currentAccount.totalWithdrawals);
};

const displayCurrBalance = function (acc) {
  const balance = acc.movements.reduce((a, b) => a + b, 0);

  let withdrawalValue = [];
  acc.movements.forEach((movement) => {
    if (movement < 0) withdrawalValue.push(movement);
  });
  withdrawalValue = withdrawalValue.reduce((a, b) => a + b, 0);
  let currCashback = Math.trunc(Math.abs(withdrawalValue) * 0.05);
  acc.balance = balance + currCashback;
  currBalance.textContent = Number(acc.balance).toFixed(2);
};

const displayCb = function (acc) {
  acc.totalCashback = Number(acc.totalWithdrawals * 0.05);

  labelCashback.textContent = Math.trunc(
    Math.abs(currentAccount.totalCashback)
  );
};

const accUpgradedPremium = function () {
  upgradeTab.style.backgroundImage =
    "linear-gradient(to top left, #352e6e, rgba(111, 96, 225, 0.7))";

  upgradeText.textContent = "Time to enjoy the CASHBACK";
  upgradeText.classList.remove("updated-to-premium");
  upgradeText.style.color = "#fff";
  upgradeText.style.fontSize = "2.4rem";

  btnUpgrade.textContent = "CONTACT US 24/7";

  displayCb(currentAccount);
};

const accUpgradedStarter = function () {
  document.querySelector(".premium-plan-card").style.width = "100%";
  document.querySelector(".modal-pricing").style.width = "33rem";

  modalPremium.style.gridTemplateColumns = "1fr";
  modalPremium.style.justifyItems = "center";
};

const upgradedPlan = function (upgradeTab) {
  if (confirm("Are you ready to start your Premium journey?")) {
    modalPremium.classList.add("modal-hidden");
    overlay.classList.add("modal-hidden");

    accUpgradedPremium();

    premiumWelcome.classList.remove("modal-hidden");
    overlay.classList.remove("modal-hidden");

    btnUpgrade.removeEventListener("click", openPremiumModal);

    btnUpgrade.addEventListener("click", function (e) {
      e.preventDefault();
      showFirstMessage();
    });

    const index = updatedAccounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    updatedAccounts[index].movements.push(-24.99);
    updatedAccounts[index].premium = true;
    currentAccount.premium = true;
    currentAccount.movements.push(-24.99);
    updateUI(currentAccount);

    localStorage.setItem("updatedAccounts", JSON.stringify(updatedAccounts));
  }
};

const updateUI = function () {
  displayMovements(currentAccount.movements);

  displayCurrBalance(currentAccount);

  displayIn(currentAccount);
  displayOut(currentAccount);

  if (currentAccount.starter) {
    accUpgradedStarter();
    starterPlanCard.remove();
  }

  if (currentAccount.premium) accUpgradedPremium();
};
updateUI();

const showFirstMessage = function () {
  overlay.classList.remove("modal-hidden");
  liveChat.classList.remove("modal-hidden");

  const showMSG = function () {
    siteMsg1.classList.remove("chat-hide");
  };
  setTimeout(showMSG, 1500);
};

const restartChats = function () {
  siteMsg1.classList.add("chat-hide");
  siteMsg2.classList.add("chat-hide");
  userTab.classList.add("chat-hide");
  userMsg.textContent = "";
};

const startLogOutTimer = function () {
  const tick = function () {
    const sec = String(time % 60).padStart(2, 0);

    timerS.textContent = sec;

    time--;
  };

  let time = 7;

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

const showSecondMessage = function () {
  const showMSG = function () {
    siteMsg2.classList.remove("chat-hide");
  };
  setTimeout(showMSG, 1500);

  const closeChats = function () {
    overlay.classList.add("modal-hidden");
    liveChat.classList.add("modal-hidden");
  };
  startLogOutTimer();
  setTimeout(closeChats, 7500);

  setTimeout(restartChats, 8500);
};

const showUserMessage = function () {
  const textValue = inputMessage.value;
  userMsg.textContent = textValue;
  userTab.classList.remove("chat-hide");
};

const depositLoanRequest = function () {
  const amountRequested = Number(ctaDepositInput.value);

  if (amountRequested < 25) return;
  const index = updatedAccounts.findIndex(
    (acc) => acc.username === currentAccount.username
  );
  if (ctaDepositLoanRequest.value === "Deposit") {
    updatedAccounts[index].movements.push(amountRequested);
    currentAccount.movements.push(amountRequested);
    currentAccount.totalDeposits += amountRequested;
  } else {
    if (amountRequested / 2 > currentAccount.totalDeposits) return;
    updatedAccounts[index].movements.push(amountRequested);
    currentAccount.movements.push(amountRequested);
    currentAccount.totalDeposits += amountRequested;
  }
  updateUI();
  localStorage.setItem("updatedAccounts", JSON.stringify(updatedAccounts));
  console.log(updatedAccounts);
};

const transferRequest = function () {
  const transferUser = updatedAccounts.find(
    (acc) => acc.username === ctaTransferUser.value
  );

  const transferPin = Number(ctaTransferPin.value);
  const transferAmount = Number(ctaTransferAmount.value);

  if (
    transferUser &&
    transferAmount >= 25 &&
    currentAccount.balance >= transferAmount &&
    transferPin === currentAccount.pin &&
    transferUser?.username !== currentAccount.username
  ) {
    const index = updatedAccounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    updatedAccounts[index].movements.push(-transferAmount);
    currentAccount.movements.push(-transferAmount);
    transferUser.movements.push(transferAmount);
    updateUI(currentAccount);
  }
  localStorage.setItem("updatedAccounts", JSON.stringify(updatedAccounts));
};

const closureRequest = function () {
  const username = ctaClosureUser.value;
  const pin = Number(ctaClosurePin.value);

  if (username === currentAccount.username && pin === currentAccount.pin) {
    const index = updatedAccounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    updatedAccounts.splice(index, 1);
    createUsernames(updatedAccounts);

    localStorage.setItem("updatedAccounts", JSON.stringify(updatedAccounts));

    window.location = "index.html";
  }
};

// EVENTS

btnLogOut.addEventListener("click", function (e) {
  e.preventDefault();
  confirm("Are you sure you want to Log Out?");
  window.location = "index.html";
});

btnUpgrade.addEventListener("click", openPremiumModal);

overlay.addEventListener("click", function (e) {
  e.preventDefault();

  restartChats();
  modalPremium.classList.add("modal-hidden");
  overlay.classList.add("modal-hidden");
  liveChat.classList.add("modal-hidden");
});

btnMessageSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  showUserMessage();
  inputMessage.value = "";

  setTimeout(showSecondMessage(), 1500);
});

btnDepositSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  depositLoanRequest();
  ctaDepositInput.value = "";
});

btnTransferSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  transferRequest();

  ctaTransferAmount.value = ctaTransferPin.value = ctaTransferUser.value = "";
});

btnClosureSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  closureRequest();

  ctaClosurePin.value = ctaClosureUser.value = "";
});

startNowPremium.addEventListener("click", function (e) {
  e.preventDefault();
  upgradedPlan(upgradeTab);
});

startNowStarter.addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Are you ready for the Starter plan to be activated?")) {
    modalPremium.classList.add("modal-hidden");
    starterWelcome.classList.remove("modal-hidden");

    accUpgradedStarter();

    const index = updatedAccounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    updatedAccounts[index].movements.push(-14.99);
    updatedAccounts[index].starter = true;
    currentAccount.starter = true;
    currentAccount.movements.push(-14.99);
    updateUI(currentAccount);

    localStorage.setItem("updatedAccounts", JSON.stringify(updatedAccounts));
  }
});
// DOM

labelWelcome.forEach(
  (user) => (user.textContent = currentAccount.owner.split(" ")[0])
);
labelCurrDate.textContent = currDate.toLocaleDateString();

btnWelcomePlan.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    starterWelcome.classList.add("modal-hidden");
    premiumWelcome.classList.add("modal-hidden");
    overlay.classList.add("modal-hidden");
  })
);

// L
// L
// L
// L
// L
// L
