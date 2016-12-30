class CardController {

  constructor() {
  }

  $onInit() {
    if (this.isEmpty) {
      this.elements = this.instance.elements;
    }
  }

}

module.exports = {
  controller: CardController,
  templateUrl: './components/card/card.html',
  bindings: {
      instance: '<',
      isEmpty: '<',
      selectedElementId: '<'
  }
};
