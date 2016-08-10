module.exports = GamesController;

GamesController.$inject = [ '$state', 'ActionBarService', 'DataService' ];

function GamesController ($state, ActionBarService, DataService) {
  var vm = this;

  vm.class = 'game padded';
  vm.layout = 'column #top @stretch';

  vm.openGame = openGame;
  vm.openTemplate = openTemplate;

  activate()

  function activate() {
    let collection = 'templates';
    let query = {
      gameId: $state.params.gameId
    };

    DataService(collection)
      .search(query)
      .$promise
      .then(function (items) {
        vm.items = items;
        ActionBarService.context = collection;
      });
  }

  function openGame (id) {
    $state.go('game', { gameId: id });
  }

  function openTemplate (id) {
    $state.go('template', { templateId: id });
  }

}
