'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'DeckDetailsController',
    ['deck', 'isNew', '$scope', '$mdDialog', 'DecksService', DeckDetailsController]
  );

function DeckDetailsController (deck, isNew, $scope, $mdDialog, DecksService) {
  var originalDeck;

  $scope.selectedTab = 0;
  $scope.disableSave = true;

  function setLocals () {
    originalDeck = _.cloneDeep(deck);
    $scope.deck = deck;

    Object.unobserve(deck, setLocals)
  }

  // If deck arrived undefined, watch for define before setting locals
  'name' in deck ? setLocals() : Object.observe(deck, setLocals);

  $scope.checkDisableSave = function () {
    // Check in evalAsync as $scope.deck will not yet be updated otherwise
    $scope.$evalAsync(function () {
      $scope.disableSave = _.isEqual(originalDeck, $scope.deck);
    });
  }

  // Create confirm button directive
  $scope.delete = function (evt) {
    DecksService.delete(deck._id);
    $mdDialog.cancel('Deck deleted');
  };

  $scope.cancel = function () {
    if (isNew) {
      DecksService.delete(deck._id);
    }

    $mdDialog.cancel('Cancelled new deck');
  };

  $scope.save = function () {
    alert('Saved');
  };
}
