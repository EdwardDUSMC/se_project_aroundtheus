import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  profileEditButton,
  addCardButton,
  profileEditModal,
  addCardModal,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardForm,
  cardSelector,
} from "../utils/Constants.js";
import { config } from "../utils/Constants.js";
import Api from "../components/Api.js";

// Linked classes
const popupWithEditProfileForm = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
  },
  handleProfileEditSubmit
);

const popupWithAddCardForm = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
  },
  handleAddCardFormSubmit
);

const popupWithImage = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});

popupWithEditProfileForm.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithImage.setEventListeners();

/*Function*/

function renderCard(item, method = "addItem") {
  const cardElement = getCardElement(item);
  section[method](cardElement);
}

function getCardElement(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

function handleImageClick(data) {
  popupWithImage.open({ name: data.name, link: data.link });
}

/*Event Handler*/

function handleProfileEditSubmit(inputValue) {
  userInfo.setUserInfo({
    name: inputValue.title,
    description: inputValue.description,
  });
  popupWithEditProfileForm.close();
  editFormValidator.disableSubmitButton();
}

function handleAddCardFormSubmit(inputValue) {
  const cardData = {
    name: inputValue.title,
    link: inputValue.url,
  };
  api.addNewCard(cardData).then((newCard) => {
    renderCard(newCard);
  });
  //renderCard(cardData);
  popupWithAddCardForm.close();
  addCardForm.reset();
  addFormValidator.disableSubmitButton();
}

addCardButton.addEventListener("click", () => {
  popupWithAddCardForm.open();
});

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  popupWithEditProfileForm.open();
});

//api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "196bd4a5-0b68-4944-a5da-dae91687bd99",
    "Content-Type": "application/json",
  },
});

api.getUserInfo();
api.getCardData();

//card render
initialCards.forEach((cardData) => renderCard(cardData));

//validator
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
