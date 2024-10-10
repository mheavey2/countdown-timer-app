console.log("JS loaded");

// store page elements as variables
const timerHeader = document.querySelector(".countdown-timer-heading");
const countdownEvents = document.querySelector(".countdown-events-list");
const countdownContainer = document.querySelector(".countdown-container");
const eventRadioButtons = document.querySelectorAll(
  "input[name=countdown-event]"
);
const timerEvent = document.querySelector("#countdown-timer-event");
const returnButton = document.querySelector("#return-btn");
returnButton.hidden = true;

//store various dates as an object
const dates = {
  gig: new Date("2024-10-10T12:05:00"),
  birthday: new Date("2024-10-26T00:00:00"),
  holidays: new Date("2024-10-19T00:00:00"),
  christmas: new Date("2024-12-25T00:00:00"),
};

//function to calculate date difference and update the timer display
function updateCountdownDisplay(target) {
  const currentDate = new Date();
  const difference = target - currentDate;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.querySelector("#countdown-days").innerText = days;
  document.querySelector("#countdown-hours").innerText = hours;
  document.querySelector("#countdown-minutes").innerText = minutes;
  document.querySelector("#countdown-seconds").innerText = seconds;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

//function to capitalise event
function capitaliseEvent(event) {
  result = event.toUpperCase(event);
  return result;
}

// function to handle when countdown is reached
function timerExpired() {
  document.querySelector("#countdown-timer-header-status").innerText =
    "OVER!!!";
  timerHeader.style.color = "#f05227";
  timerHeader.style.fontSize = "3em";
}

//loop over radio buttons and add click event when clicked.when button is clicked hide event list and show countdown timer. Update timer dynamically every second
eventRadioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.checked) {
      value = button.value;
      countdownEvents.hidden = true;
      countdownContainer.hidden = false;

      function startInterval() {
        if (dates.hasOwnProperty(value)) {
          updateCountdownDisplay(dates[value]);
        }
        timerEvent.innerText = capitaliseEvent(value);

        returnButton.hidden = false;
      }
      const timerInterval = setInterval(() => {
        // startInterval();

        if (
          updateCountdownDisplay(dates[value]).days <= 0 &&
          updateCountdownDisplay(dates[value]).hours <= 0 &&
          updateCountdownDisplay(dates[value]).minutes <= 0 &&
          updateCountdownDisplay(dates[value]).seconds <= 0
        ) {
          timerExpired();
          clearInterval(timerInterval);
        }
      }, 1000);
      startInterval();
    }
  });
});

// handle return button click event
returnButton.addEventListener("click", () => {
  resetTimer();
});

//reset to defaults
function resetTimer() {
  // hide timer and show event list
  countdownEvents.hidden = false;
  countdownContainer.hidden = true;
  returnButton.hidden = true;
  // clear current checked button
  eventRadioButtons.forEach((button) => {
    button.checked = false;
    document.querySelector("#countdown-timer-header-status").innerText =
      "ON!!!";
  });
}
