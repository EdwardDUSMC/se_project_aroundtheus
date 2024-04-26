function showInputError(formEls, inputEls, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEls.querySelector(`#${inputEls.id}-error`);
  inputEls.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEls.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEls, inputEls, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEls.querySelector(`#${inputEls.id}-error`);
  inputEls.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValiditiy(formEls, inputEls, options) {
  if (!inputEls.validity.valid) {
    showInputError(formEls, inputEls, options);
  } else {
    hideInputError(formEls, inputEls, options);
  }
}

function disabledButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEls) => inputEls.validity.valid);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    disabledButton(submitButton, inactiveButtonClass);
    return;
  }
  enableButton(submitButton, inactiveButtonClass);
}
function setEventListeners(formEls, options) {
  const { inputSelector } = options;
  const inputEls = [...formEls.querySelectorAll(inputSelector)];
  const submitButton = formEls.querySelector(".modal__button");
  inputEls.forEach((inputEls) => {
    inputEls.addEventListener("input", (e) => {
      checkInputValiditiy(formEls, inputEls, options);
      toggleButtonState(inputEls, submitButton);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(form, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__error_visible",
};

enableValidation(config);
