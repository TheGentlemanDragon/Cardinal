module.exports = EditorController;

EditorController.$inject = [ '$scope' ];

function EditorController ($scope) {
  const vm = this;

  // Vars
  vm.elementKeys = getElementKeys();
  vm.scale = $scope.scale;

  // Functions
  vm.addElement = addElement;
  vm.applyStyle = applyStyle;
  vm.getStyle = getStyle;
  vm.selectElement = selectElement;

  activate();

  function activate() {
    selectElement(0);
  }

  function addElement() {
    let id = $scope.template.elements.length;
    let element = {
      id: id,
      name: `element ${id + 1}`,
      style: ''
    };
    $scope.template.elements.push(element);
    vm.elementKeys = getElementKeys();
    selectElement(id);
  }

  function applyStyle(style) {
    let newStyle;
    try {
      newStyle = style.split('\n').join('; ');
    }
    catch (e) { }
    finally {
      if (newStyle) {
        $scope.element.style = newStyle;
      }
    }
  }

  function getStyle(element) {
    return (element.style || '').replace(/; /g, '\n');
  }

  function getElementKeys() {
    return $scope.template.elements.map(element => element.name);
  }

  function selectElement(index) {
    $scope.template.elements.forEach(element => delete element.selected);
    $scope.element = $scope.template.elements[index];
    vm.element = $scope.element.name;
    $scope.element.selected = true;
    $scope.rawStyle = getStyle($scope.element);
  }

}
