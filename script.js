const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const timeElements = document.querySelectorAll('span');
const countdownBtn = document.getElementById('countdown-button');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCoutdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set date input min to today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// take values from form input
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCoutdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCoutdown));

  if (countdownDate === '') {
    alert('please select a date')
  } else {
    // get number version of the current date
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
  }
}

// popluate countdown /complete UI
const updateDOM = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // hide input
    inputContainer.hidden = true;

    // if the countdown has ended, show complete
    if (distance < 0) {
      clearInterval(countdownActive);
      countdownEl.hidden = true;
      completeEl.hidden = false;
      completeElInfo.textContent = `${countdownTitle} has finished on ${countdownDate}!`
    } else {
      // show countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      countdownEl.hidden = false;
      completeEl.hidden = true;
    }
  }, second);
}

// reset all countdown
const reset = () => {
  clearInterval(countdownActive);
  countdownTitle = '';
  countdownDate = '';
  inputContainer.hidden = false;
  countdownEl.hidden = true;
  completeEl.hidden = true;
  localStorage.removeItem('countdown');
}

const restorePreviousCountdown = () => {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCoutdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCoutdown.title;
    countdownDate = savedCoutdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }

}

// event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset)

restorePreviousCountdown();