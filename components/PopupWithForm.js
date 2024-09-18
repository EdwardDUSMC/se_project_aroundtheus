export default class PopupWithForm extends Popup {
  constructor(popupSelector,()=>{} ) {
    super(popupSelector);
    this._popupFrom = document.querySelector(".modal__form");
  }

  _getInputValues() {}

  setEventListeners() {}
}
