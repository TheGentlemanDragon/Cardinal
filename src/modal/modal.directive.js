module.exports = Modal;

function Modal () {
  const directive = {
    controller: require('./modal.controller.js'),
    controllerAs: 'modal',
    replace: true,
    restrict: 'E',
    scope: {},
    template: '<modal ng-include="modal.template" ng-show="modal.isDisplayed"></modal>'
  };

  return directive;
}
