module.exports = ActionBar;

function ActionBar () {
  var directive = {
    controller: ActionBarController,
    controllerAs: 'vm',
    restrict: 'E',
    templateUrl: './action-bar/action-bar.html'
  };

  return directive;
}

ActionBarController.$inject = [ '$scope', 'ActionBarService', 'ModalService' ];

function ActionBarController ($scope, ActionBarService, ModalService) {
  const vm = this;
  vm.actionBar = ActionBarService;
  vm.execute = execute;

  function execute (action, type) {
    if (action === 'new' && type === 'game') {
      ModalService.show('new-game')
    }
  }

}
