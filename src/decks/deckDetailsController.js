'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'DeckDetailsController',
    ['deck', 'isNew', '$scope', '$state', '$mdDialog', 'DataService', DeckDetailsController]
  );

function DeckDetailsController (deck, isNew, $scope, $state, $mdDialog, DataService) {
  var originalDeck;
  var result = { action: null, msg: null };

  $scope.selectedTab = 0;
  $scope.checked = [];
  $scope.disableSave = true;
  $scope.deck = deck;
  $scope.templates = DataService('templates').search({ deckId: deck._id });

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
    var itemType = $scope.selectedTab === 0 ? 'templates' : 'cards';
    DataService(itemType).save({ deckId: deck._id })
      .$promise
      .then(function (template) {
        $scope.templates.push(template);
      });
  };

  $scope.deleteItems = function (items) {
    var ary = ($scope.selectedTab === 0 ? $scope.templates : $scope.cards);
    _.forEach(items, function (item) {
      item
        .$delete()
        .then(function () {
           _.remove(ary, function (aryItem) {
            return aryItem._id === item._id;
          });
        });      
    });
  };

  $scope.openTemplate = function (template) {
    result.action = 'open';
    result.msg = false;
    $mdDialog.hide(result);
    $state.go('templates', { templateId: template._id });
  };

  $scope.toggleCheck = function (item) {
    item.checked = !item.checked;

    var ary = ($scope.selectedTab === 0 ? $scope.templates : $scope.cards);
    $scope.checked.length = 0;

    // Rebuild checked array
     _.forEach(ary, function (aryItem) {
      if (aryItem.checked) {
        $scope.checked.push(aryItem);
      }
    });
  };
}
