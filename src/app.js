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
      url: '/',
      templateUrl: 'decks/decks.tpl',
      controller: 'DecksController'
    })

    // .state('templates', {
    //   url: '/templates/:templateId',
    //   templateUrl: 'templates/template.tpl',
    //   controller: 'TemplateController'
    // });

    $urlRouterProvider.otherwise('/');

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
