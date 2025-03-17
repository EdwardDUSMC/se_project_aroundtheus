import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/popupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditButton,
  addCardButton,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardForm,
  cardSelector,
} from "../utils/constants.js";
import { config } from "../utils/constants.js";
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

const popupWithDeleteButton = new PopupWithConfirm(
  {
    popupSelector: "#delete-card-modal",
  },
  openConfirmPopup
);

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});

popupWithEditProfileForm.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithDeleteButton.setEventListeners();

/*Function*/

function renderCard(item, method = "addItem") {
  const cardElement = getCardElement(item);
  section[method](cardElement);
}

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    cardSelector,
    (cardInstance) => openConfirmPopup(cardInstance),
    handleImageClick,
    handleLikeButton
  );
  return card.getView();
}

function handleImageClick(data) {
  console.log(data.name);
  popupWithImage.open({ name: data.name, link: data.link });
}

function handleLikeButton(cardId, likeButton) {
  if (!cardId) return;

  const isLiked = likeButton.classList.contains("card__like-button_active");

  api
    .toggleLike(cardId, isLiked)
    .then((updatedCard) => {
      if (updatedCard && "isLiked" in updatedCard) {
        likeButton.classList.toggle(
          "card__like-button_active",
          updatedCard.isLiked
        );
      }
    })
    .catch((error) => console.error("Error updating like:", error));
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
  popupWithAddCardForm.close();
  addCardForm.reset();
  addFormValidator.disableSubmitButton();
}

function openConfirmPopup(card) {
  popupWithDeleteButton.setSubmitFunction(() => {
    // this should be basically the handleDeleteCardConfirm logic
    api
      .deleteCardData(card._id)
      .then(() => {
        // use handleDeleteCard which removes the card from the DOM
        card.handleDeleteCard(); //
      })
      .catch((err) => {
        console.error("Failed to delete card: ", err);
      })
      .finally(() => {
        popupWithDeleteButton.close();
      });
  });
  // this is the part of the handleDeleteClick
  popupWithDeleteButton.open();
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

//card renderer api
let cardArray = [];

let data = api.getCardData();
data.then((data) => {
  cardArray = data;
  console.log(cardArray);
  cardArray.forEach((cardData) => renderCard(cardData));
});

const section = new Section(
  {
    items: cardArray,
    renderer: renderCard,
  },
  ".cards__list"
);

//validator
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
