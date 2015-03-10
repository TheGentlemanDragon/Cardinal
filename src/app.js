'use strict';

/* Create and configure application */

angular.module('cardinal', [
  'cardinal.services', 'cardinal.controllers',
  'ui.router', 'ngMaterial', 'ngResource',
])

.config([
  '$urlRouterProvider', '$stateProvider', '$locationProvider', '$mdThemingProvider',
  Routes])

.run([Run]);

function Routes ($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider) {

  $locationProvider.html5Mode(false);

  $stateProvider
    .state('decks', {
      url: '/decks',
      templateUrl: 'decks/decks.tpl',
      controller: 'DecksController'
    })

    .state('deck', {
      url: '/decks/:deckId',
      templateUrl: 'decks/decks.tpl',
      controller: 'DecksController'
    })

    .state('editor', {
      url: '/editor/:templateId',
      templateUrl: 'editor/editor.tpl',
      controller: 'EditorController'
    })
      .state('editor.settings', {
        url: '/settings',
        templateUrl: 'editor/settings.tpl'
      })
      .state('editor.layout', {
        url: '/layout',
        templateUrl: 'editor/layout.tpl',
        controller: 'LayoutController'
      })
      .state('editor.data', {
        url: '/data',
        templateUrl: 'editor/data.tpl'
      })
      .state('editor.preview', {
        url: '/preview',
        templateUrl: 'editor/preview.tpl'
      });

    $urlRouterProvider.otherwise('/decks');

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('brown')
      .warnPalette('red');
}

function Run () {
  // App initialization stuff here
}

/* Create sub-modules */

angular.module('cardinal.services', []);
angular.module('cardinal.controllers', []);


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
