class EditorController {

  constructor($interval, DataService) {
     $interval(this.checkTemplate, 3000, null, null, this);
     this.DataService = DataService;
  }

  $onInit() {
    this.cachedTemplate = JSON.stringify(this.template);
    this.element = this.template.elements[0];
    Object.defineProperty(this, 'style', {
      get: () => this.getStyle(this.template.elements[this.element.id]),
      set: (style) => this.applyStyle(style)
    });
  }

  addElement() {
    let id = this.template.elements.length;
    let element = {
      id: id,
      name: `element ${id + 1}`,
      style: ''
    };
    this.template.elements.push(element);
    this.element = element;
  }

  applyStyle(style) {
    let newStyle;
    try {
      newStyle = style.split('\n').join('; ');
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

  getStyle(element) {
    return (element.style || '').replace(/; /g, '\n');
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
  templateUrl: './editor/editor.html'
};
