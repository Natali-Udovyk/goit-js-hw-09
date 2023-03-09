import Notiflix from 'notiflix';

const createBtn = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

}

createBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const amount = document.querySelector('input[name="amount"]').value;
  const delay_step = Number(document.querySelector('input[name="step"]').value);
  const first_delay = Number(document.querySelector('input[name="delay"]').value);

  for (let i = 0; amount > i; i += 1) {
    let delay = first_delay + (i * delay_step);
    let position = i + 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }

})


