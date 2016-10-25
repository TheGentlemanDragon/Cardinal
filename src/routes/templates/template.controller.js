module.exports = TemplateController;

TemplateController.$inject = [ '$state', 'ActionBarService', 'template' ];

function TemplateController ($state, ActionBarService, template) {
  var vm = this;

  vm.class = 'template';
  vm.layout = 'row #top @stretch';
  vm.scale = 2.5;
  vm.template = template;

  vm.selectElement = selectElement;

  activate();

  function activate() {
    ActionBarService.context = '';
  }

  function selectElement($event) {
    vm.element = vm.template.elements[$event.element.id];
  }
}






// function TemplateController ($state, $mdDialog, $mdSidenav, DataService) {
//   var _ = require('lodash');
//   var vm = this;
//
//   class element {
//     constructor (index) {
//       this.name = 'element';
//       this.container = {
//         position: 'relative',
//         width: 0,
//         height: 0,
//         left: 10,
//         top: 10
//       };
//       this.style = {
//         position: 'absolute',
//         'font-size': 12,
//         width: 60,
//         height: 20
//       };
//       this.units = {
//         left: 'px',
//         top: 'px',
//         width: 'px',
//         height: 'px',
//         'font-size': 'px'
//       };
//       this.attributes = {};
//       this.content = 'text';
//       this.layer = 'float';
//     }
//
//     get styleElement() {
//       return _.transform(this.style, (result, value, key) => {
//         result[key] = value + (value && this.units[key] ? this.units[key] : '');
//       }, {});
//     }
//
//     get styleContainer() {
//       return _.transform(this.container, (result, value, key) => {
//         result[key] = value + (value && this.units[key] ? this.units[key] : '');
//       }, {});
//     }
//
//   };
//
//   vm.cards = DataService('cards').search({ templateId: $state.params.templateId });
//   vm.element = null;
//   vm.elements = [];
//   vm.menu = 'properties';
//   vm.template = DataService('templates').get({ id: $state.params.templateId });
//   vm.zoom = getZoom() || 1;
//
//   vm.addElement = addElement;
//   vm.deleteTemplate = deleteTemplate;
//   vm.saveZoom = saveZoom;
//   vm.selectElement = selectElement;
//
//   vm.cards.$promise.then(function(cards) {
//     vm.card = cards[0];
//   });
//
//   function addElement () {
//     var newElement = new element(vm.elements.length);
//     vm.elements.push(newElement);
//     selectElement(vm.elements.length - 1);
//     focusElement('[ng-model="vm.element.name"]');
//   }
//
//   function deleteTemplate (template, event) {
//     var confirm = $mdDialog.confirm()
//       .parent(angular.element(document.body))
//       .title(`Are you sure you want to delete '${vm.template.name}'?`)
//       .content('You will not be able to undo this action')
//       .ariaLabel('Delete Template')
//       .ok('Delete')
//       .cancel('Cancel')
//       .targetEvent(event);
//
//     $mdDialog.show(confirm).then(Ok, Cancel);
//
//     function Ok () {
//       console.log('Deleted');
//       vm.template.$remove()
//         .then(result => {
//           console.log(result);
//           $state.go('deck', {
//             deckId: vm.template.deckId,
//             msg: 'Deleted template "${vm.template.name}"'
//           });
//         });
//     }
//
//     function Cancel () {
//       console.log('Cancelled');
//     }
//   }
//
//   function focusElement (element) {
//     var element = element;
//     window.setTimeout(() => {
//       element = document.querySelector(element);
//       element.setSelectionRange(0, element.value.length)
//     }, 100);
//   }
//
//   function getZoom () {
//     return parseFloat(localStorage.getItem('zoom'));
//   }
//
//   function saveZoom (zoom) {
//     localStorage.setItem('zoom', zoom);
//   }
//
//   function selectElement (index) {
//     vm.element = vm.elements[index];
//
//     if (!vm.card) {
//       vm.card = vm.cards[0];
//     }
//   }
//
// }
