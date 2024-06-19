export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._modalSpan = settings._modalSpan;
    this._form = formEl;
  }
  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _showInputError(inputEl) {
    const errorMessageElement = this._form.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputEl.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageElement = this._form.querySelector(this._inputSelector);
    const modalSpan = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = " ";
    modalSpan.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _isValidInput(_inputEls) {
    return this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  toggleButtonState() {
    const isValidInputResult = this._isValidInput(this._inputEls);
    if (!isValidInputResult) {
      this.disableSubmitButton();
    } else {
      this._enableButton();
    }
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this.toggleButtonState();
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(evt);
    });
    this._setEventListeners();
  }
}
