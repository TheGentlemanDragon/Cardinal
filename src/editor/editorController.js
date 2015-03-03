'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'EditorController',
    ['$scope', '$state', '$stateParams', '$mdDialog', '$mdToast', 'DataService', EditorController]
  );

function EditorController ($scope, $state, $stateParams, $mdDialog, $mdToast, DataService) {
  $scope.template = DataService('templates').get({ id: $stateParams.templateId });
  $scope.go = $state.go;

  $scope.$on("$stateChangeSuccess", function updatePage() {
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