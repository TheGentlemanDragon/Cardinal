class EditorController {

  constructor(DataService) {
    this.DS = DataService;
  }

  $onInit() {
    // ng-model-options config
    this.updateOnBlur = { updateOn: 'blur' };

    // Unpack some vars to save space
    this.cards = this.data.cards;
    this.template = this.data.template;
    this.elements = this.template.elements;

    Object.defineProperty(this, 'style', {
      get: () => this.getStyle(this.elements[this.element.id]),
      set: (style) => this.applyStyle(style)
    });
  }

  addCard() {
    let cards = this.DS('cards').save({
      templateId: this.template._id,
      data: new Array(this.elements.length)
    });
  }

  addElement() {
    let elements = setDefault(this.template, 'elements', []);
    let element = {
      id: elements.length,
      name: `element ${elements.length}`,
      style: ''
    };
    elements.push(element);
    this.element = element;
  }

  applyStyle(style) {
    let newStyle;
    try {
      newStyle = style.split('\n').map(line => line.replace(' ', ': ')).join('; ');
    }
    catch (e) { }
    finally {
      if (newStyle) {
        this.elements[this.element.id].style = newStyle;
      }
    }
  }

  deleteElement(element) {
    let index = this.elements.indexOf(element);
    this.elements.splice(index, 1);
    this.element = null;
    this.template.$save();
  }

  getStyle(element) {
    return (element.style || '').replace(/; /g, '\n').replace(/: /g, ' ');
  }

  getElementKeys() {
    return this.elements.map(element => element.name);
  }

}

module.exports = {
  bindings: {
    element: '<',
    card: '<',
    ui: '<',
    data: '<',
  },
  controller: EditorController,
  templateUrl: './components/editor/editor.html'
};
