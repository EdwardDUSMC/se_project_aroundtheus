export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
    console.log(this._popupElement);
    console.log(this._closeButton);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscapeClose() {}

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
  }
}
