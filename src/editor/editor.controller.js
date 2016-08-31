module.exports = EditorController;

EditorController.$inject = [ '$interval', '$scope', 'DataService' ];

function EditorController ($interval, $scope, DataService) {
  const vm = this;
  let cachedTemplate = JSON.stringify($scope.template);

  // Vars
  vm.scale = $scope.scale;

  // Functions
  vm.addElement = addElement;

  activate();

  function activate() {
    $scope.element = $scope.template.elements[0];
    Object.defineProperty($scope, 'style', {
      get: () => getStyle($scope.template.elements[$scope.element.id]),
      set: (style) => applyStyle(style)
    });
  }

  function addElement() {
    let id = $scope.template.elements.length;
    let element = {
      id: id,
      name: `element ${id + 1}`,
      style: ''
    };
    $scope.template.elements.push(element);
    $scope.element = element;
  }

  function applyStyle(style) {
    let newStyle;
    try {
      newStyle = style.split('\n').join('; ');
    }
    catch (e) { }
    finally {
      if (newStyle) {
        $scope.template.elements[$scope.element.id].style = newStyle;
      }
    }
  }

  function checkTemplate() {
    let template = JSON.stringify($scope.template);

    if (!angular.equals(cachedTemplate, template)) {
      cachedTemplate = template;
      DataService('templates').update({ id: $scope.template._id }, $scope.template);
    }
  }

  function getStyle(element) {
    return (element.style || '').replace(/; /g, '\n');
  }

  function getElementKeys() {
    return $scope.template.elements.map(element => element.name);
  }

  $interval(checkTemplate, 3000);
}
