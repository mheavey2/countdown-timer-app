const birthday = new Date("2024-10-26T00:00:00");
//function to calculate date difference
function updateCountdownDisplay() {
  const currentDate = new Date();

  const difference = birthday - currentDate;
  console.log(`diff: ${difference}`);

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

function startCountdown() {
  updateCountdownDisplay();
  setInterval(() => {
    updateCountdownDisplay(birthday);
  }, 1000);
}

startCountdown();
