module.exports = GamesController;

GamesController.$inject = ['$state', 'DataService'];

function GamesController ($state, DataService) {
  var vm = this;

  vm.games = [];
  vm.newGame = newGame;
  vm.openGame = openGame;

  activate();

  ////////////

  function activate () {
    // Load all games
    DataService('games').search({})
      .$promise
      .then(function (games) {
        vm.games = games;

        if (!$state.params.gameId) {
          return;
        }

        // Open game details if given game id
        var game = _.find(games, function (game) {
          return game._id === $state.params.gameId;
        });
        vm.openGame(game);
      });
  }

  function newGame (evt) {
    // $mdToast.notify('Creating new game');
    DataService('games')
      .save({}).$promise
      .then(function(game) {
        vm.games.push(game);
        vm.openGame(game, evt, true);
      })
  };

  function openGame (game, evt, isNew) {
    $state.go('game', { gameId: game._id });
  };
}
