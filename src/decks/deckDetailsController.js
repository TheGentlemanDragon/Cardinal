'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'DeckDetailsController',
    ['$scope', 'deck', 'DecksService', DeckDetailsController]
  );

function DeckDetailsController ($scope, deck, DecksService) {
  $scope.deck = deck;
  $scope.selectedTab = 0;

  $scope.newItem = function (item) {
    if (item === 'template') {
      $scope.deck.createTemplate();
    }
  };

  $scope.hide = function () {
    $mdDialog.hide();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.save = function (deck) {
    DecksService.create(deck);
    $mdDialog.hide(answer);
  };
}
