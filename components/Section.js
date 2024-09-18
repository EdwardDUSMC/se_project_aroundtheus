export default class Section {
  constructor({ items, renderer }, cardselector) {
    console.log({ items, renderer }, cardselector);

    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(cardselector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    console.log("We are adding a new item");
    this._element.prepend(element);
  }
}
