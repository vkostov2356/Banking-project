"use strict";

// LANDING PAGE **************************************

// IMPORTS

import { account1 } from "./accounts.mjs";
import { account2 } from "./accounts.mjs";
import { account3 } from "./accounts.mjs";
import { account4 } from "./accounts.mjs";
import { accounts } from "./accounts.mjs";
import { createUsernames } from "./accounts.mjs";
const accounts2 = JSON.parse(localStorage.getItem("updatedAccounts"));
// SELECTORS
console.log(accounts2);
console.log(accounts);

// ***** header *****

const navBar = document.querySelector(".nav-bar");
const logoNav = document.querySelector(".nav-logo");
const logoFooter = document.querySelector(".footer-logo");
const learnMore = document.querySelector(".learn-more");
const btnLogIn = document.querySelector(".login-btn");
const header = document.querySelector(".header");
const navHeight = navBar.getBoundingClientRect().height;

// ***** general *****

const allSections = document.querySelectorAll(".container");

// ***** operations *****

const features = document.querySelector(".section-features");

// ***** operations *****

const tabsContainer = document.querySelector(".operations-tab-container");
const tabs = document.querySelectorAll(".operations-tab");
const tabsContent = document.querySelectorAll(".operation-description");

// ***** pricing *****

const btnPricing = document.querySelectorAll(".start-now");

// ***** testimonials *****

const slideReview = document.querySelectorAll(".review-text");
const slidePeople = document.querySelectorAll(".review-people");
const testimonialPeopleContainer = document.querySelector(".testimonial-imgs");

// ***** signIn *****

const btnSignIn = document.querySelector(".sign-in-btn");

// ***** modal windows *****

const logInModal = document.querySelector(".modal-login");
const SignUpModal = document.querySelector(".modal-signup");
const SignUpModal2 = document.querySelector(".modal-signup2");
const finishModal = document.querySelector(".modal-signup3");
const overlay = document.querySelector(".overlay");
const btnCloseModals = document.querySelectorAll(".close-modal");
const btnAccountNo = document.querySelector(".btn-account-not");
const btnAccountYes = document.querySelector(".btn-account-yes");
const btnLoginInForm = document.querySelector(".btn-login-form");
const btnSignUpContinue = document.querySelector(".modal-continue");
const btnFinishSignUp = document.querySelector(".finish-signup");
const formLogIn = document.querySelector(".form-login");
const formSignUp = document.querySelector(".form-signup");
const formSignUp2 = document.querySelector(".form-signup2");

// ***** modal windows LOGIN *****

const unInput = document.querySelector(".username-input");
const passInput = document.querySelector(".password-input");
const signUpInputs = document.querySelectorAll(".signup-inputs");
let currentAccount;

// FUNCTIONS

// ***** navigation *****

const navFade = function (e) {
  const link = e.target;
  const siblings = link.closest(".nav-bar").querySelectorAll(".nav-links");

  siblings.forEach((el) => {
    el.classList.add("nav-opacity");
  });
  btnLogIn.classList.add("nav-opacity");

  e.target.classList.remove("nav-opacity");
};

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) navBar.classList.add("sticky");
  else navBar.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// ***** general *****

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// ***** scrolling *****

const heroScroll = function () {
  header.scrollIntoView({ behavior: "smooth" });
};

const articleScroll = function () {
  features.scrollIntoView({ behavior: "smooth" });
};

document.querySelector(".nav-sections").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav-links")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// ***** operations *****

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations-tab");
  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operation-active"));
  tabsContent.forEach((c) => c.classList.add("hidden-all"));

  clicked.classList.add("operation-active");

  document
    .querySelector(`.operation-description-${clicked.dataset.tab}`)
    .classList.remove("hidden-all");
});

// ***** testimonials *****

testimonialPeopleContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".review-people");
  if (!clicked) return;

  slidePeople.forEach((t) => t.classList.remove("testimonial-img-active"));
  slideReview.forEach((slide) => slide.classList.remove("review-active"));

  clicked.classList.add("testimonial-img-active");

  document
    .querySelector(`.review-text-${clicked.dataset.slide}`)
    .classList.add("review-active");
});

// ***** modal windows *****

const openModalLog = function (e) {
  e.preventDefault();
  logInModal.classList.remove("modal-hidden");
  overlay.classList.remove("modal-hidden");
};
const openModalSign = function (e) {
  e.preventDefault();
  SignUpModal.classList.remove("modal-hidden");
  overlay.classList.remove("modal-hidden");
};
const openModalSign2 = function (e) {
  e.preventDefault();
  SignUpModal2.classList.remove("modal-hidden");
  overlay.classList.remove("modal-hidden");
};

const closeModals = function (e) {
  e.preventDefault();
  logInModal.classList.add("modal-hidden");
  SignUpModal.classList.add("modal-hidden");
  SignUpModal2.classList.add("modal-hidden");
  finishModal.classList.add("modal-hidden");
  overlay.classList.add("modal-hidden");
};

const logInToSignUp = function (e) {
  e.preventDefault();
  logInModal.classList.toggle("modal-hidden");
  SignUpModal.classList.toggle("modal-hidden");
};

const SignUpContinue = function (e) {
  e.preventDefault();
  if (btnSignUpContinue) {
    SignUpModal.classList.add("modal-hidden");
    SignUpModal2.classList.remove("modal-hidden");
    clearInputs();
  }
};

const SignUpEnd = function (e) {
  e.preventDefault();

  SignUpModal2.classList.add("modal-hidden");
  finishModal.classList.remove("modal-hidden");
  clearInputs();
};

// ***** modal windows LOGIN *****

const clearInputs = function () {
  unInput.value = passInput.value = "";
  signUpInputs.forEach((input) => (input.value = ""));
};

const logInSuc = function (e) {
  e.preventDefault();
  if (accounts2) {
    currentAccount = accounts2.find((acc) => acc.username === unInput.value);

    localStorage.setItem("storageName", JSON.stringify(currentAccount));

    if (currentAccount?.pin === Number(passInput.value)) {
      window.location = "profile.html";
      unInput.value = passInput.value = "";
    } else if (
      (currentAccount = accounts.find((acc) => acc.username === unInput.value))
    ) {
      alert(
        `Your account has been closed! \nPlease get in touch with our customer support for further assistance.`
      );
      clearInputs();
    } else {
      alert(`Incorrect username or password. \nPlease try again!`);
      clearInputs();
    }
  } else {
    currentAccount = accounts.find((acc) => acc.username === unInput.value);
    console.log(currentAccount);

    localStorage.setItem("storageName", JSON.stringify(currentAccount));

    if (currentAccount?.pin === Number(passInput.value)) {
      window.location = "profile.html";
      unInput.value = passInput.value = "";
    } else {
      alert(`Incorrect username or password. \nPlease try again!`);
      clearInputs();
    }
  }
};

// EVENTS
navBar.addEventListener("mouseover", navFade);
navBar.addEventListener("mouseout", function (e) {
  document.querySelectorAll(".nav-links").forEach((el) => {
    el.classList.remove("nav-opacity");
  });
  btnLogIn.classList.remove("nav-opacity");
});

logoNav.addEventListener("click", heroScroll);
logoFooter.addEventListener("click", heroScroll);
learnMore.addEventListener("click", articleScroll);

btnPricing.forEach((btn) => btn.addEventListener("click", openModalSign));

btnLogIn.addEventListener("click", openModalLog);
btnSignIn.addEventListener("click", openModalSign);
overlay.addEventListener("click", closeModals);
btnCloseModals.forEach((btn) => btn.addEventListener("click", closeModals));
btnAccountNo.addEventListener("click", logInToSignUp);
btnAccountYes.addEventListener("click", logInToSignUp);
btnFinishSignUp.addEventListener("click", closeModals);
formSignUp.addEventListener("submit", SignUpContinue);
formSignUp2.addEventListener("submit", SignUpEnd);

formLogIn.addEventListener("submit", logInSuc);
