module.exports = ComponentList;

function ComponentList () {
  const directive = {
    controller: ComponentListController,
    controllerAs: 'vm',
    restrict: 'E',
    scope: {
      context: '@'
    },
    templateUrl: './component-list/component-list.html'
  };

  return directive;
}

ComponentListController.$inject = [ '$scope', 'ActionBarService', 'DataService' ];

function ComponentListController ($scope, ActionBarService, DataService) {
  const vm = this;
  const actionMap = {
    games: {
      action: openCollection,
      params: ['templates', 'gameId'],
    },
    templates: {}
  };

  vm.context = $scope.context;
  vm.doAction = doAction;

  activate();

  function activate () {

    if (!$scope.context) {
      return;
    }

    openCollection($scope.context);
  }

  function doAction (context, param) {
    let executable = actionMap[context];
    executable.action(...executable.params.concat(param));
  }

  function openCollection (collection, filterKey, filterId) {
    let query = {};

    if (filterKey && filterId) {
      query[filterKey] = filterId;
    }

    DataService(collection)
      .search(query)
      .$promise
      .then(function (items) {
        vm.title = collection[0].toUpperCase() + collection.slice(1);
        vm.items = items;
        vm.context = collection;
        ActionBarService.context = collection;
      });
  }
}
