"use strict";

module.exports = TemplateController;

TemplateController.$inject = [
  '$state', '$mdDialog', '$mdSidenav', 'DataService'
];

function TemplateController ($state, $mdDialog, $mdSidenav, DataService) {
  var _ = require('lodash');
  var vm = this;
  var templates = DataService('templates');

  class element {
    constructor (index) {
      this.name = 'element';
      this.style = {
        left: null,
        top: null,
        width: null,
        height: null,
        'font-size': 12
      };
      this.units = {
        left: 'px',
        top: 'px',
        width: 'px',
        height: 'px',
        'font-size': 'px'
      };
      this.attributes = {};
      this.type = 'text';
      this.content = '';
    }

    get styleObj() {
      if (!_.every(this.style) || !_.every(this.units)) {
        return '';
      }

      return _.transform(this.units, (result, value, key) => {
        result[key] = this.style[key] + value;
      }, {});
    }
  };

  vm.elements = [];
  vm.menu = 'layout';
  vm.element = null;
  vm.template = DataService('templates').get({ id: $state.params.templateId });

  vm.addElement = addElement;
  vm.deleteTemplate = deleteTemplate;
  vm.selectElement = selectElement;

  function addElement () {
    var newElement = new element(vm.elements.length);
    vm.elements.push(newElement);
    selectElement(vm.elements.length - 1);
  }

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
        .then(result => {
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

  function selectElement (index) {
    vm.element = vm.elements[index];
  }
}
