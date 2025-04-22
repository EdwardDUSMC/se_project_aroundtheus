import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");

    console.log("PopupWithForm constructor:", this._handleFormSubmit);
  }

  getForm() {
    return this._popupForm;
  }

  getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value.trim();
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data[input.name] !== undefined) {
        input.value = data[input.name]; // Set input value based on name attribute
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Submitting form..."); // Debugging
      console.log("handleFormSubmit:", this._handleFormSubmit); // Debugging
      this._handleFormSubmit(this.getInputValues());
    });
  }
}
