export default class Card {
  constructor({ title, link }, cardData, cardSelector, handlePreviewImage) {
    this._title = cardData.title;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
  }
  name;
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
      this._handlePreviewImage({ title: this._title, link: this._link });
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._title;
    this._cardElement.querySelector(".card__image").alt = this._title;

    this._setEventListeners();

    return this._cardElement;
  }
}
