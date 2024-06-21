import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*************
 * WRAPPERS; *
 *************/

const profileEditModal = document.querySelector("#edit-modal");
const addNewCardModal = document.querySelector("#add-card-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.forms["edit-profile-modal"];
const addCardForm = document.forms["add-card-form"];
const cardListEl = document.querySelector(".cards__list");

/*******************
 * BUTTON ELEMENTS *
 *******************/

const profileEditBtn = document.querySelector("#profile-edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".modal__close");
/********************
 * PREVIEW ELEMENTS *
 ********************/

const previewCardModal = document.querySelector("#modal-preview");
const previewImage = document.querySelector(".modal__preview-image");
const previewDescription = document.querySelector(
  ".modal__preview-description"
);

/*************
 * FORM DATA *
 *************/

const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardNameInput = document.querySelector("#card-name-input");
const cardUrlInput = document.querySelector("#card-url-input");

/**************
 * FUNCTIONS; *
 **************/

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeWithEscape);
  modal.removeEventListener("mousedown", closePopupOverlay);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeWithEscape);
  modal.addEventListener("mousedown", closePopupOverlay);
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handlePreviewImage);
  return cardElement.getView();
}

/******************
 * EVENT HANDLERS *
 ******************/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addNewCardModal);
  addCardForm.reset();
  addFormValidator.disableSubmitButton();
}

function closeWithEscape(e) {
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".modal_opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

function closePopupOverlay(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

/*******************
 * EVENT LISTENERS *
 *******************/

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

/******************
 * FORM LISTENERS *
 ******************/

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

addCardBtn.addEventListener("click", () => openModal(addNewCardModal));

/******************************
 * PREVIEW IMAGE CLOSE BUTTON *
 ******************************/

function handlePreviewImage(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewDescription.textContent = cardData.name;
  openModal(previewCardModal);
}

/***************
 * VALIDATION; *
 ***************/

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();

initialCards.forEach((cardData) => renderCard(cardData));
