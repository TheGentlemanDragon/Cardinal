module.exports = TemplateController;

TemplateController.$inject = [
  '$state', '$mdDialog', '$mdSidenav', 'DataService'
];

function TemplateController ($state, $mdDialog, $mdSidenav, DataService) {
  var vm = this;
  var templates = DataService('templates');

  vm.deleteTemplate = deleteTemplate;
  vm.menu = 'properties';
  vm.template = DataService('templates').get({ id: $state.params.templateId });

  function deleteTemplate (template, event) {
    var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title(`Are you sure you want to delete '${vm.template.name}'?`)
      .content('You will not be able to undo this action')
      .ariaLabel('Delete Template')
      .ok('Delete')
      .cancel('Cancel')
      .targetEvent(event);

    $mdDialog.show(confirm).then(Ok, Cancel);

    function Ok () {
      console.log('Deleted');
      vm.template.$remove()
        .then(function (result) {
          console.log(result);
          $state.go('deck', {
            deckId: vm.template.deckId,
            msg: 'Deleted template "${vm.template.name}"'
          });
        });
    }

    function Cancel () {
      console.log('Cancelled');
    }
  }
}
