'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'DeckDetailsController',
    ['deck', 'isNew', '$scope', '$mdDialog', 'DataService', DeckDetailsController]
  );

function DeckDetailsController (deck, isNew, $scope, $mdDialog, DataService) {
  var originalDeck;
  var result = { action: null, msg: null };

  $scope.selectedTab = 0;
  $scope.disableSave = true;
  $scope.deck = deck;
  originalDeck = _.cloneDeep(deck);

  $scope.checkDisableSave = function () {
    // Check in evalAsync as $scope.deck will not yet be updated otherwise
    $scope.$evalAsync(function () {
      $scope.disableSave = _.isEqual(originalDeck, $scope.deck);
    });
  };

  // Create confirm button directive
  $scope.delete = function (evt) {
    deck.$delete();
    result.action = 'delete';
    result.msg = 'Deleted';
    $mdDialog.hide(result);
  };

  $scope.cancel = function () {
    if (isNew) {
      deck.$delete();
    }
    _.assign(deck, originalDeck);

    result.action = isNew ? 'delete' : 'cancel';
    result.msg = 'Cancelled';
    $mdDialog.hide(result);
  };

  $scope.save = function () {
    deck.$save()
      .then(function () {
        result.action = 'save';
        result.msg = 'Saved';
        $mdDialog.hide(result);
      }, function () {
        result.action = 'save';
        result.msg = 'Error saving deck';
        $mdDialog.hide(result);
      });
  };

  $scope.newItem = function () {
    DataService('decks').createTemplate
  };
}
