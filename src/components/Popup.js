export default class Popup {
  constructor({popupSelector}) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
      this._popupElement.classList.add("modal_opened");
      document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
      this._popupElement.classList.remove("modal_opened");
      document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(e) {
      if (e.key === "Escape") {
          this.close();
        }
  }

  setEventListeners() {
      this._popupElement.addEventListener("mousedown", (e) => {
          if (
            e.target.classList.contains("modal") ||
            e.target.classList.contains("modal__close")
          ) {
            this.close();
          }
        });
  }
}