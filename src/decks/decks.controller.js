module.exports = DecksController;

DecksController.$inject = ['$mdDialog', '$mdToast', '$state', 'DataService'];

function DecksController ($mdDialog, $mdToast, $state, DataService) {
  var vm = this;

  vm.decks = [];
  vm.newDeck = newDeck;
  vm.openDeck = openDeck;

  activate();

  ////////////

  function activate () {
    // Load all decks
    DataService('decks').search({})
      .$promise
      .then(function (decks) {
        vm.decks = decks;

        if (!$state.params.deckId) {
          return;
        }

        // Open deck details if given deck id
        var deck = _.find(decks, function (deck) {
          return deck._id === $state.params.deckId;
        });
        vm.openDeck(deck);
      });
  }

  function newDeck (evt) {
    $mdToast.notify('Creating new deck');
    DataService('decks')
      .save({}).$promise
      .then(function(deck) {
        vm.decks.push(deck);
        vm.openDeck(deck, evt, true);
      })
  };

  function openDeck (deck, evt, isNew) {
    $state.go('deck', { deckId: deck._id });
    // $mdDialog
    //   .show({
    //     controller: DeckDetailsController,
    //     templateUrl: 'decks/deckDetails.html',
    //     targetEvent: evt,
    //     locals: {
    //       deck: deck,
    //       isNew: isNew || false
    //     },
    //     clickOutsideToClose: false
    //   })
    //   .then(function(result) {
    //     if (result.action === 'delete') {
    //       _.remove(vm.decks, function (item) {
    //         return item._id === deck._id;
    //       });
    //     }

    //     if (result.msg) {
    //       $mdToast.notify(result.msg);
    //     }
    //   });
  };
}
