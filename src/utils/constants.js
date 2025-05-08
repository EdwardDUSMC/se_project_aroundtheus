export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const profileEditButton = document.querySelector("#profile-edit-button");
export const avatarUpdateButton = document.querySelector(
  "#avatar-update-button"
);
export const addCardButton = document.querySelector("#add-card-button");
export const deleteCardButton = document.querySelector("#card-delete-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const addCardModal = document.querySelector("#add-card-modal");
export const updateAvatarModal = document.querySelector("#update-avatar-modal");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const avatarUrlInput = document.querySelector("#avatar-url-input");
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardForm = addCardModal.querySelector(".modal__form");
export const updateAvatarForm = updateAvatarModal.querySelector(".modal__form");
export const cardSelector = "#card-template";
