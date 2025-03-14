import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleDeleteSubmit) {
    super(popupSelector);

    this._handleDeleteSubmit = handleDeleteSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupDeleteButton = this._popupElement.querySelector(
      "#delete-card-button"
    );
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteSubmit(this);
    });
  }
}
