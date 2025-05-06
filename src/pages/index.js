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
  avatarUpdateButton,
  addCardButton,
  profileTitleInput,
  profileDescriptionInput,
  avatarUrlInput,
  profileEditForm,
  addCardForm,
  updateAvatarForm,
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

const popupWithEditAvatarForm = new PopupWithForm(
  {
    popupSelector: "#update-avatar-modal",
  },
  handleAvatarUpdateSubmit
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
  nameElement: ".profile__name",
  jobElement: ".profile__about",
  avatarElement: ".profile__avatar",
});

popupWithEditProfileForm.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithDeleteButton.setEventListeners();
popupWithEditAvatarForm.setEventListeners();

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

function handleProfileEditSubmit(event) {
  const inputValues = popupWithEditProfileForm.getInputValues(); // Get form values

  if (!inputValues.name || !inputValues.about) {
    return;
  }

  popupWithEditProfileForm.setLoadingText(true);

  api
    .updateUserInfo(inputValues.name, inputValues.about)
    .then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
      popupWithEditProfileForm.close();
    })
    .catch((err) => console.error("Profile update failed:", err))
    .finally(() => {
      popupWithEditProfileForm.setLoadingText(false);
    });
}

function handleAvatarUpdateSubmit(event) {
  const inputvalues = popupWithEditAvatarForm.getInputValues(); // Get form values
  const avatarUrl = inputvalues.avatar;

  if (!avatarUrl) {
    return;
  }

  popupWithEditAvatarForm.setLoadingText(true);
  api
    .updateProfileAvatar(avatarUrl)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupWithEditAvatarForm.close();
    })
    .catch((err) => console.error("Profile update failed:", err))
    .finally(() => {
      popupWithEditAvatarForm.setLoadingText(false);
    });
}

function handleAddCardFormSubmit(inputValue) {
  const cardData = {
    name: inputValue.title,
    link: inputValue.url,
  };

  popupWithAddCardForm.setLoadingText(true);
  api
    .addNewCard(cardData)
    .then((newCard) => {
      renderCard(newCard);
    })
    .finally(() => {
      popupWithAddCardForm.setLoadingText(false);
    });
  popupWithAddCardForm.close();
  addCardForm.reset();
  addFormValidator.disableSubmitButton();
}

function openConfirmPopup(card) {
  popupWithDeleteButton.setSubmitFunction(() => {
    // this should be basically the handleDeleteCardConfirm logic
    api
      .deleteCardData(card._cardId)
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
  profileDescriptionInput.value = currentUserInfo.about;
  popupWithEditProfileForm.open();
});
avatarUpdateButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  avatarUrlInput.value = currentUserInfo.avatar;
  popupWithEditAvatarForm.open();
});

//api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "196bd4a5-0b68-4944-a5da-dae91687bd99",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData); // Display user info in UI
  })
  .catch((err) => console.error("Failed to load user info:", err));

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
const updateFormValidator = new FormValidator(config, updateAvatarForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
updateFormValidator.enableValidation();
