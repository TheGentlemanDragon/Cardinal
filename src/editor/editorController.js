'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'EditorController',
    ['$scope', '$state', '$stateParams', '$mdDialog', '$mdToast', 'DataService', EditorController]
  );

function EditorController ($scope, $state, $stateParams, $mdDialog, $mdToast, DataService) {
  $scope.control = 'settings';
  $scope.template = DataService('templates').get({ id: $stateParams.templateId });

}