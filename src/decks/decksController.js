'use strict';

angular
  .module('cardinal')
  .controller(
    'DecksController',
    ['$scope', '$state', '$mdDialog', '$mdToast', 'DataService', DecksController]
  );

function DecksController ($scope, $state, $mdDialog, $mdToast, DataService) {
  $scope.decks = []

  // Load decks
  $scope.decks = DataService('decks').search({});

  // Open deck details if given deck id
  $scope.decks.$promise.then(function (decks) {
    if ($state.params.deckId) {
      var deck = _.find(decks, function (deck) {
        return deck._id === $state.params.deckId;
      });
      $scope.openDeck(deck);
    }
  });

  // Default toast settings
  var notify = function (msg) {
    $mdToast.show($mdToast
      .simple()
      .content(msg)
      .position('top right')
    );
  }

  $scope.newDeck = function (evt) {
    notify('Creating new deck');
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

      if (result.msg) {
        notify(result.msg);
      }
    });
  };
}