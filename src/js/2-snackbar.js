import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import checkIcon from '/img/check.svg';
import crossIcon from '/img/cross.svg';

const form = document.querySelector('.form');

function createPromise(delayInput, stateInput) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateInput === 'fulfilled') {
        resolve(delayInput);
      } else {
        reject(delayInput);
      }
    }, +delayInput);
  });
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = event.target.elements.delay.value;
  const stateInput = event.target.elements.state.value;

  createPromise(delayInput, stateInput)
    .then(delay => {
      iziToast.success({
        title: 'Yep!!!',
        titleColor: '#ffffff',
        message: `Fulfilled promise in ${delay}ms`,
        iconUrl: checkIcon,
        messageColor: '#ffffff',
        backgroundColor: '#59a10d',
        position: 'topRight',
        timeout: 4000,
        animateInside: true,
        progressBar: false,
        close: false,
        closeOnClick: true,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Oops!',
        titleColor: '#ffffff',
        message: `Rejected promise in ${delay}ms`,
        iconUrl: crossIcon,
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 4000,
        animateInside: true,
        progressBar: false,
        close: false,
        closeOnClick: true,
      });
    });

  event.target.reset();
}
