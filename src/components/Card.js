export default class Card {
  constructor({
    cardData,
    cardSelector,
    handleDeleteClick,
    handleImageClick,
    api,
  }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._api = api;
    this._cardSelector = cardSelector;
    this._handleDeleteClick = handleDeleteClick;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.classList.toggle(
      "card__like-button_active",
      this._isLiked
    );

    this._likeButton.addEventListener("click", () => {
      this.toggleLike(this._api);
    });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  handleDeleteCard() {
    this._cardElement.remove();
  }

  toggleLike(api) {
    const isLiked = this._likeButton.classList.contains(
      "card__like-button_active"
    );

    api
      .toggleLike(this._cardId, isLiked)
      .then((updatedCard) => {
        if (updatedCard && "isLiked" in updatedCard) {
          this._likeButton.classList.toggle(
            "card__like-button_active",
            updatedCard.isLiked
          );
        }
      })
      .catch((err) => console.error("Error toggling like:", err));
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
