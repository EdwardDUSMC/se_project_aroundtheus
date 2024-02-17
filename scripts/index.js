const initialCards = [
  {
    title: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */

const profileEditModal = document.querySelector("#edit-modal");
const addNewCardModal = document.querySelector("#add-card-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditFrom = profileEditModal.querySelector(".modal__form");
const addCardFrom = addNewCardModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* Button Elements*/

const profileModalCloseBtn = profileEditModal.querySelector(".modal__close");
const profileEditBtn = document.querySelector("#profile-edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const addCardCloseBtn = addNewCardModal.querySelector(".modal__close");

/* Form Data */

const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

/* Functions */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelectorAll(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle(".card__like-button_active");
  });

  cardTitleEl.textContent = cardData.title;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.title;
  return cardElement;
}

/* Event Handlers */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const title = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ title, link }, cardListEl);
  closeModal(addNewCardModal);
}

/* Event Listeners */

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalCloseBtn.addEventListener("click", () =>
  closeModal(profileEditModal)
);

/* Form Listeners */

profileEditFrom.addEventListener("submit", handleProfileEditSubmit);
addCardFrom.addEventListener("submit", handleAddCardSubmit);

addCardBtn.addEventListener("click", () => openModal(addNewCardModal));
addCardCloseBtn.addEventListener("click", () => closeModal(addNewCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
