export default class Card {
  constructor(cardData, cardSelector, handlePreviewImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton = this._cardElement.querySelector(".card__trash-button");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardImageEl.addEventListener("click", () => {
      this._handlePreviewImage({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();
    this._cardImageEl.src = this._link;
    this._cardElement.querySelector(".card__name").textContent = this._name;
    this._cardImageEl.alt = this._name;

    return this._cardElement;
  }
}
