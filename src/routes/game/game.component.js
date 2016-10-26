class GameController {

  constructor($state, ActionBarService, DataService) {
    this.$state = $state;
    this.ABS = ActionBarService;
    this.DS = DataService;
    this.layout = 'column #top @stretch';
  }

  $onInit () {
    const ctrl = this;
    let collection = 'templates';
    let query = {
      gameId: this.$state.params.gameId
    };

    this.DS(collection)
      .search(query)
      .$promise
      .then(function (items) {
        ctrl.items = items;
        ctrl.ABS.context = collection;
      });
  }

  openGame (id) {
    this.$state.go('game', { gameId: id });
  }

  openTemplate (id) {
    this.$state.go('template', { templateId: id });
  }
}

module.exports = {
  controller: GameController,
  templateUrl: 'routes/game/game.html'
};
