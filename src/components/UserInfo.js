export default class UserInfo {
  constructor({ nameElement, jobElement, avatarElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
    this._avatarElement = document.querySelector(avatarElement);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      about: this._jobElement.textContent.trim(),
      avatar: this._avatarElement.textContent.trim(),
    };
  }
  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
  }
  setUserAvatar({ avatar }) {
    this._avatarElement.src = avatar;
  }
}
