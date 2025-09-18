import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import checkIcon from '/img/check.svg';
import crossIcon from '/img/cross.svg';

const datetimePicker = document.querySelector('.datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysElement = document.querySelector('span[data-days]');
const hoursElement = document.querySelector('span[data-hours]');
const minutesElement = document.querySelector('span[data-minutes]');
const secondsElement = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        iconUrl: crossIcon,
        position: 'topRight',
        iconColor: 'white',
        close: false,
        closeOnClick: true,
        timeout: 4000,
        animateInside: true,
      });

      userSelectedDate = null;
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function startCountdown() {
  if (!userSelectedDate) {
    return;
  }

  datetimePicker.disabled = true;
  startButton.disabled = true;

  countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = userSelectedDate - currentDate;

    if (timeDifference <= 0) {
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      clearInterval(countdownInterval);
      countdownInterval = null;

      datetimePicker.disabled = false;

      iziToast.success({
        message: 'Time іs up!',
        iconUrl: checkIcon,
        messageColor: '#ffffff',
        backgroundColor: '#59a10d',
        position: 'topRight',
        close: false,
        closeOnClick: true,
        timeout: 4000,
        animateInside: true,
      });

      return;
    }

    const timeLeft = convertMs(timeDifference);
    updateTimerDisplay(timeLeft);
  }, 1000);
}

startButton.addEventListener('click', startCountdown);

updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
