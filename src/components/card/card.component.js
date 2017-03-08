class CardController {

  constructor() {
  }

  $onInit() {
  }

}

module.exports = {
  controller: CardController,
  templateUrl: './components/card/card.html',
  bindings: {
      template: '<',
      instance: '<',
      mode: '<',
      selectedElementId: '<'
  }
};
