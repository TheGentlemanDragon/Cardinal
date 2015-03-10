'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'EditorController',
    ['$scope', '$state', '$mdDialog', '$mdToast', 'DataService', EditorController]
  );

function EditorController ($scope, $state, $mdDialog, $mdToast, DataService) {
  $scope.template = DataService('templates').get({ id: $state.params.templateId });

  $scope.template.$promise.then(function (temp) {
    $scope.deckId = temp.deckId;
  });

  $scope.$on('$stateChangeSuccess', function updatePage() {
    $scope.state = $state.current.name;
  });  

  $scope.controls = [
    {
      state: 'editor.settings',
      label: 'Settings',
      icon: 'mdi-settings'
    },
    {
      state: 'editor.layout',
      label: 'Layout',
      icon: 'mdi-crop-portrait'
    },
    {
      state: 'editor.data',
      label: 'Data',
      icon: 'mdi-database-outline'
    },
    {
      state: 'editor.preview',
      label: 'Preview',
      icon: 'mdi-eye'
    }
  ];


}