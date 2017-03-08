class TemplateController {

  constructor($state, ActionBarService) {
    this.$state = $state;
    this.ABS = ActionBarService;
    this.ui = {
      scale: 2.5,
      mode: 'element'
    }
  }

  $onInit() {
    this.ABS.context = '';

    // Default preview card
    this.card = this.data.cards.length ? this.data.cards[0] : null;
  }

  selectElement($event) {
    let element;
    let selectIndex;
    let selectId;

    // Gather all the 'element' tags
    let elements = document
      .elementsFromPoint($event.clientX, $event.clientY)
      .filter(el => el.tagName === 'ELEMENT');

    if (elements.length === 0) {
      this.element = null;
      return;
    }

    // Find the element with class 'selected' and store the next index after it
    // or store first index if none or last selected
    selectIndex = elements.findIndex(el => el.className.includes('selected')) + 1;
    selectIndex = (selectIndex < elements.length ? selectIndex : 0);

    // Store the element.id of the element in the selectIndex
    selectId = angular.element(elements[selectIndex]).scope().element.id;

    // Set that id as selected
    this.element = this.data.template.elements[selectId];
  }
}

module.exports = {
  controller: TemplateController,
  templateUrl: 'routes/template/template.html',
  bindings: {
    data: '<'
  }
};
