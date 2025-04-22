export default class UserInfo {
  constructor({ nameElement, jobElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      about: this._jobElement.textContent.trim(),
    };
  }
  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
  }
}
