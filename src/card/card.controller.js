module.exports = CardController;

CardController.$inject = [ '$scope' ];

function CardController ($scope) {
  const vm = this;

  activate();

  function activate () {
    if ($scope.isEmpty) {
      vm.elements = $scope.instance.elements;
    }
  }

  return vm;
}
