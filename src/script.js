console.log("JS loaded");

const timerHeader = document.querySelector(".countdown-timer-heading");
const countdownEvents = document.querySelector(".countdown-events-list");
const countdownContainer = document.querySelector(".countdown-container");
const eventRadioButtons = document.querySelectorAll(
  "input[name=countdown-event]"
);
const timerEvent = document.querySelector("#countdown-timer-event");

const gigDate = new Date("2024-10-27T18:00:00");
const birthday = new Date("2024-10-26T00:00:00");
const holidayStartDate = new Date("2024-10-19T00:00:00");
const christmas = new Date("2024-12-25T00:00:00");
const returnButton = document.querySelector("#return-btn");
let currentEvent = "";
returnButton.hidden = true;

//function to calculate date difference
function updateCountdownDisplay(target) {
  const currentDate = new Date();
  const difference = target - currentDate;
  console.log(`diff: ${difference}`);
  console.log(`current: ${currentEvent}`);

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
}

//function to capitalise event
function capitaliseEvent(event) {
  result = event.toUpperCase(event);
  return result;
}

function getEvent(eventValue) {
  switch (eventValue) {
    case "christmas":
      eventDate = christmas;
      document.querySelector("#countdown-pronoun").hidden = true;
      break;
    case "gig":
      eventDate = gigDate;
      break;
    case "birthday":
      eventDate = birthday;
      break;
    case "holidays":
      eventDate = holidayStartDate;
      break;
    default:
      return eventDate;
  }

  timerEvent.innerText = capitaliseEvent(eventValue);
  currentEvent = eventDate;
  updateCountdownDisplay(eventDate);

  returnButton.hidden = false;
}

//loop over radio buttons and add click event if clicked
eventRadioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.checked) {
      value = button.value;
    }

    countdownEvents.hidden = true;
    countdownContainer.hidden = false;
    getEvent(value);
  });
});

// handle return button click
returnButton.addEventListener("click", () => {
  // hide timer and show event list
  countdownEvents.hidden = false;
  countdownContainer.hidden = true;
  returnButton.hidden = true;
  // clear current checked button
  eventRadioButtons.forEach((button) => {
    button.checked = false;
  });
});
