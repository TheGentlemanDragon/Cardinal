class CardController {

  constructor() {
  }

  $onInit() {
    if (this.isEmpty) {
      this.elements = this.instance.elements;
    }

    // set first element as selected
    this.selectedElementId = 0;
  }

  selectElement(id) {
    this.selectedElementId = id;
    this.onSelectElement({
      $event: {
        element: this.elements[id]
      }
    });
  }
}

module.exports = {
  controller: CardController,
  templateUrl: './card/card.html',
  bindings: {
      instance: '<',
      isEmpty: '<',
      onSelectElement: '&'
  }
};
