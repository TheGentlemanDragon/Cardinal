module.exports = ModalController;

ModalController.$inject = [ '$rootScope' ];

function ModalController ($rootScope) {
  const vm = this;

  vm.isDisplayed = false;

  activate();

  function activate () {

    $rootScope.$on('modal.open', function(event, template) {
      vm.isDisplayed = true;
      vm.template = template;
    });
  }

  return vm;
}
