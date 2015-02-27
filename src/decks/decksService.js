'use strict';

angular
  .module('cardinal.services')
  .factory(
    'DecksService',
    [ '$resource', DecksService ]);

function DecksService ($resource) {
  var allDecks = [];
  var deckApi = $resource(
    'http://localhost:8888/:resource/:id',
    { },
    { // method:?, params:?, isArray:?, headers:?
      createDeck: { method: 'POST', params: { resource: 'decks' }},
      deleteDeck: { method: 'DELETE',  params: { resource: 'decks' }},
      getDecks: { method: 'GET', params: { resource: 'decks' }, isArray: true },
      getDeck: { method: 'GET', params: { resource: 'decks' }},
    }
  );

  deckApi.getDecks().$promise.then(function (decks) {
    decks.forEach(function (deck) {
      allDecks.push(_.clone(deck));
    });
  });

  function Deck (id) {
    // var query;
    // if (id === undefined) {
    //   query = decksCol.insert({
    //     _id: generateUUID(),
    //     name: 'New Deck',
    //     description: '',
    //     templates: [],
    //     cards: []
    //   });

    //   if (query.inserted.length > 0) {
    //     _.assign(this, query.inserted[0]);
    //   }

    //   // TODO: Throw insert error
    // } else {
    //   query = decksCol.find({_id: id});
    // }

    return this;
  }


  // Deck.prototype.createTemplate = function () {
  //   var template = DataService.create('template', this.id);
  //   template.name = 'New Template';
  //   // TODO: Add template service
  //   this.templates[template.id] = template;
  //   this.update();
  //   return template;
  // };

  // Deck.prototype.deleteTemplate = function (template) {
  //   DataService.delete(template);
  //   delete this.templates[template.id];
  // };

  // Deck.prototype.save = function () {
  //   decksService._save();
  // };

  // Object.defineProperty(Deck.prototype, 'toJson', {
  //   get: function() {
  //     return {
  //       id: this.id,
  //       name: this.name,
  //       type: 'deck',
  //       description: this.description,
  //       templates: _.pluck(this.templates, 'id'),
  //       cards: Object.keys(this.cards)
  //     };
  //   }
  // });

  var decksService = {

    // // Load persistent data
    // load: function () {
    //   decksCol.load(function (err) {
    //     if (err) {
    //       alert('Error loading Decks!');
    //     }
    //   });
    // },

    // // Save persistent data
    // save: function () {
    //   decksCol.save(function (err) {
    //     if (err) {
    //       alert('Error saving Decks!');
    //     }
    //   });
    // },

    create: function () {
      var newDeck = {};

      deckApi.createDeck().$promise.then(function (deck) {
        delete deck['$promise'];
        delete deck['$resolved'];
        _.assign(newDeck, deck);
      });

      allDecks.push(newDeck);
      return newDeck;
    },

    delete: function (deckId) {
      return deckApi.deleteDeck({ id: deckId });
    }

  //   createTemplate: function (name, deck) {
  //     var template = DataService.insert(name, 'template');
  //     template.parent = deck.id;
  //     deck.templates = deck.templates || [];
  //     deck.templates.push(template.id);
  //     DataService.update(deck);
  //     return template.id;
  //   },

  //   deleteTemplate: function (template) {
  //     try {
  //       deck.templates.some(function (item, index, ary) {
  //         if (item.id === template.id) {
  //           ary.splice(index, 1);
  //           return true;
  //         }
  //       });
  //       DataService.update(deck);
  //     } catch (e) {
  //       return false;
  //     }
  //     return true;
  //   },

  //   getChild: function (id) {
  //     return DataService.get(id);
  //   },


  //   save: function(deck) {
  //     DataService.update(deck);
  //   }

  };

  Object.defineProperty(decksService, 'all', {
    get: function() {
      return allDecks;
    }
  });

  return decksService;
}
