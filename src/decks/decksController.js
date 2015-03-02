'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'DecksController',
    ['$scope', '$state', '$mdDialog', '$mdToast', 'DataService', DecksController]
  );

function DecksController ($scope, $state, $mdDialog, $mdToast, DataService) {
  $scope.decks = []

  // Load decks
  $scope.decks = DataService('decks').search({});

  $scope.newDeck = function (evt) {
    $mdToast.showSimple('Creating new deck');
    DataService('decks')
      .save({}).$promise
      .then(function(deck) {
        $scope.decks.push(deck);
        $scope.openDeck(deck, evt, true);
      })
  };

  $scope.openDeck = function (deck, evt, isNew) {
    $mdDialog.show({
      controller: DeckDetailsController,
      templateUrl: 'decks/deckDetails.tpl',
      targetEvent: evt,
      locals: {
        deck: deck,
        isNew: isNew || false
      },
      clickOutsideToClose: false
    })
    .then(function(result) {
      if (result.action === 'delete') {
        _.remove($scope.decks, function (item) {
          return item._id === deck._id;
        });
      }
      $mdToast.showSimple(result.msg);
    });
  };
}