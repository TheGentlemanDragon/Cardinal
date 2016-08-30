"use strict";

module.exports = TemplateController;

TemplateController.$inject = [
  '$state', '$mdDialog', '$mdSidenav', 'DataService'
];

function TemplateController ($state, $mdDialog, $mdSidenav, DataService) {
  var _ = require('lodash');
  var Element = require('./element.class')
  var vm = this;

  vm.cards = DataService('cards').search({ templateId: $state.params.templateId });
  vm.element = null;
  vm.menu = 'layout';
  vm.template = DataService('templates').get({ id: $state.params.templateId });
  vm.zoom = getZoom() || 1;

  vm.addElement = addElement;
  vm.deleteTemplate = deleteTemplate;
  vm.saveZoom = saveZoom;
  vm.selectElement = selectElement;
  vm.saveTemplate = saveTemplate;

  vm.cards.$promise.then(cards => {
    vm.card = cards[0];
  });

  vm.template.$promise.then(template => {
    // Elements are stored as normal JS objects; cast them into Element class types
    template.elements.forEach((item, index, array) => {
      array[index] = Object.assign(new Element(), item);
    })
    selectElement(0);
  });

  function addElement () {
    var newElement = new Element();
    vm.template.elements.push(newElement);
    selectElement(vm.template.elements.length - 1);
    focusElement('[ng-model="vm.element.name"]');
    vm.saveTemplate();
  }

  // TODO: Return changed values
  // TODO: Create API Patch to update only changes
  // TODO: Add Patch to data service
  function compareObjects (obj1, obj2) {
    _.merge(obj1, obj2, (objectValue, sourceValue, key, object, source) => {
      var diffValue = !_.isEqual(objectValue, sourceValue);
      var diffReference = Object(objectValue) !== objectValue;
      if (diffValue && diffReference) {
        console.log(key + "\n    Expected: " + sourceValue + "\n    Actual: " + objectValue);
      }
    });
  }

  function deleteElement () {

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

  function focusElement (element) {
    var element = element;
    window.setTimeout(() => {
      element = document.querySelector(element);
      element.setSelectionRange(0, element.value.length)
    }, 100);
  }

  function getZoom () {
    return parseFloat(localStorage.getItem('zoom'));
  }

  function saveTemplate () {
    vm.template.$save();
  }

  function saveZoom (zoom) {
    localStorage.setItem('zoom', zoom);
  }

  function selectElement (index) {
    vm.element = vm.template.elements[index];

    if (!vm.card) {
      vm.card = vm.cards[0];
    }
  }

}
