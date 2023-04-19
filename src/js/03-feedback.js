const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const email = form.elements.email;
const message = form.elements.message;

dataFill();

form.addEventListener('input', throttle(onInput, 500));

form.addEventListener('submit', onSubmit);

function onInput(event) {
  const feedbackFormState = {
    email: email.value,
    message: message.value,
  };

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(feedbackFormState)
  );
}

function dataFill() {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedData) {
    email.value = savedData.email;
    message.value = savedData.message;
  }
}

function onSubmit(event) {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  console.log(savedData);
  localStorage.removeItem('feedback-form-state');
  form.reset();
}
