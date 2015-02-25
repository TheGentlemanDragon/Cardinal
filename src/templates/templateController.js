'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'TemplateController',
    ['$scope', '$state', '$stateParams', '$mdDialog', '$mdToast', 'DecksService', TemplateController]
  );

function TemplateController ($scope, $state, $stateParams, $mdDialog, $mdToast, DecksService) {

  var Backspace = 8;
  var Delete = 46;

  $scope.template = $stateParams.templateId;

  var notify = function (msg) {
    $mdToast.show(
      $mdToast
        .simple()
        .content(msg)
        .position('top right')
        .hideDelay(2000)
    );
  }

}