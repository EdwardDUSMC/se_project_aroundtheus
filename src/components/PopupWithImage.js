import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({popupSelector}) {
        super({popupSelector});
        this._imageElement = this._popupElement.querySelector(".modal__image");
        this._captionElement = this._popupElement.querySelector("#preview-title");
    }

    open(data) {
        this._imageElement.src = data.link;
        this._imageElement.alt = data.alt;
        this._captionElement.textContent = data.name;
        super.open();
    }
}