module.exports = ModalService;

ModalService.$inject = [ '$rootScope' ];

function ModalService ($rootScope) {
  const service = {
    register: register,
    show: show,
  };

  var modals = {};

  activate();

  function activate () {
  }

  function register (name) {
    modals[name] = `./modal/views/${name}.html`;
  }

  function show (name) {
    $rootScope.$emit( 'modal.open', modals[name] );
  }

  return service;
}
