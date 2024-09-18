import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = document.querySelector(".modal__preview-image");
    this._previewDescription = document.querySelector(
      ".modal__preview-description"
    );
  }

  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewDescription.textContent = name;
    super.open();
  }
}
