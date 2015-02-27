'use strict';

angular
  .module('cardinal.controllers')
  .controller(
    'DecksController',
    ['$scope', '$state', '$mdDialog', '$mdToast', 'DecksService', DecksController]
  );

function DecksController ($scope, $state, $mdDialog, $mdToast, DecksService) {

  $scope.decks = DecksService.all;

  $scope.newDeck = function (evt) {
    $mdToast.showSimple('Creating new deck');
    $scope.openDeck(DecksService.create(), evt, true);
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
    .then(function(deck) {
      $mdToast.showSimple('Deck saved');
    }, function(msg) {
      $mdToast.showSimple(msg);
    });
  };


  // var state = {
  //   selected: null,
  //   editing: null
  // };

  // var Backspace = 8;
  // var Delete = 46;


  // function confirmDelete (obj, evt, callback) {
  //   var confirm = $mdDialog.confirm()
  //     .title('Delete ' + obj.type + ': ' + obj.name + '?')
  //     .content('This action cannot be undone.')
  //     .ok('Delete')
  //     .cancel('Cancel')
  //     .targetEvent(evt);

  //   $mdDialog.show(confirm).then(function() {
  //     notify(callback(obj) ? 'Deleted' : 'Error deleting!')
  //   });
  // }

  // function doneEditing (revert) {
  //   if (revert) {
  //     state.editing.innerText = state.editing.dataset.name;
  //   }

  //   state.editing.removeAttribute('contentEditable');
  //   state.editing = null;
  // }

  // function notify (msg) {
  //   $mdToast.show(
  //     $mdToast
  //       .simple()
  //       .content(msg)
  //       .position('top right')
  //       .hideDelay(2000)
  //   );
  // }

  // $scope.newTemplate = function (deck) {
  //   var template = deck.createTemplate();
  //   $state.go('templates', { templateId: template.id });
  // };

  // $scope.deleteTemplate = function (deck, templateId, evt) {
  //   evt.stopPropagation();
  //   var template = $scope.getTemplate(templateId);
  //   confirmDelete(template, evt, DecksService.deleteTemplate);
  // };

  // // $scope.getTemplate = function (id) {
  // //   return DecksService.getChild(id);
  // // }

  // $scope.openTemplate = function (deck, template) {
  //   $state.go('templates', { templateId: template.id });
  // }

  // // $scope.deleteDeck = function (deck, evt) {
  // //   evt.stopPropagation();

  // //   var confirm = $mdDialog.confirm()
  // //     .title('Delete \'' + deck.name + '\'?')
  // //     .content('This action cannot be undone.')
  // //     .ok('Delete')
  // //     .cancel('Cancel')
  // //     .targetEvent(evt);

  // //   $mdDialog.show(confirm).then(function() {
  // //     notify(DecksService.delete(deck) ? 'Deck deleted' : 'Error deleting deck!')
  // //   });
  // // };

  // $scope.isDeckSelected = function (deck) {
  //   return (state.selected == deck.id);
  // }

  // $scope.isInEditing = function (deck) {
  //   return (state.selected == deck.id) && !!state.editing;
  // }

  // $scope.selectDeck = function (deck) {
    
  //   // If deck is already selected
  //   if (state.selected === deck.id) {
  //     state.selected = null;

  //     // Cancel Edit if new selection while editing
  //     if (state.editing) {
  //       doneEditing(true);
  //     }
  //   } else {
  //     state.selected = deck.id;
  //   }
  // };
}