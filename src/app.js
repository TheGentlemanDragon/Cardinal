'use strict';

/* Create and configure application */

angular.module('cardinal', [
  'ui.router', 'ngMaterial', 'ngResource',
])

.config([
  '$urlRouterProvider', '$stateProvider', '$locationProvider', '$mdThemingProvider', Config
])

.run([
  '$mdToast', Run
]);

function Config ($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider) {

  $locationProvider.html5Mode(false);

  // Set routes
  $stateProvider
    .state('decks', {
      url: '/decks',
      templateUrl: 'decks/decks.html',
      controller: 'DecksController as vm'
    })

    .state('deck', {
      url: '/decks/:deckId',
      templateUrl: 'deck/deck.html',
      controller: 'DeckController as vm',
      params: { msg: null }
    })

    .state('template', {
      url: '/templates/:templateId',
      templateUrl: 'template/template.html',
      controller: 'TemplateController as vm'
    });

      // .state('editor', {
      //   url: '/editor/:templateId',
      //   templateUrl: 'editor/editor.html',
      //   controller: 'EditorController'
      // })
      // .state('editor.settings', {
      //   url: '/settings',
      //   templateUrl: 'editor/settings.html'
      // })
      // .state('editor.layout', {
      //   url: '/layout',
      //   templateUrl: 'editor/layout.html',
      //   controller: 'LayoutController'
      // })
      // .state('editor.data', {
      //   url: '/data',
      //   templateUrl: 'editor/data.html'
      // })
      // .state('editor.preview', {
      //   url: '/preview',
      //   templateUrl: 'editor/preview.html'
      // });

    $urlRouterProvider.otherwise('/decks');

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red')
      .warnPalette('red');
}

function Run ($mdToast) {
  // App initialization stuff here

  $mdToast.notify = function (msg) {
    $mdToast.show($mdToast
      .simple()
      .content(msg)
      .position('bottom left')
    );
  };
}


/* Global utilities */

function generateUUID () {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

// function stripPromise (promise) {
//   var result = {};
//   delete promise['$promise'];
//   delete promise['$resolved'];
//   _.assign(result, promise);
//   return result;
// }
