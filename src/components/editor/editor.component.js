class EditorController {

  constructor($interval, DataService) {
    $interval(this.checkTemplate, 3000, null, null, this);
    this.DataService = DataService;
  }

  $onInit() {
    this.cachedTemplate = JSON.stringify(this.template);
    this.mode = 'element';
    Object.defineProperty(this, 'style', {
      get: () => this.getStyle(this.template.elements[this.element.id]),
      set: (style) => this.applyStyle(style)
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
        this.template.elements[this.element.id].style = newStyle;
      }
    }
  }

  checkTemplate(context) {
    let template = JSON.stringify(context.template);

    if (!angular.equals(context.cachedTemplate, template)) {
      context.DataService('templates').update({ id: context.template._id }, context.template);
      context.cachedTemplate = template;
    }
  }

  deleteElement(element) {
    let index = this.template.elements.indexOf(element);
    this.template.elements.splice(index, 1);
    this.element = null;
  }

  getStyle(element) {
    return (element.style || '').replace(/; /g, '\n').replace(/: /g, ' ');
  }

  getElementKeys() {
    return this.template.elements.map(element => element.name);
  }

}

module.exports = {
  bindings: {
    element: '<',
    scale: '<',
    template: '<'
  },
  controller: EditorController,
  templateUrl: './components/editor/editor.html'
};
