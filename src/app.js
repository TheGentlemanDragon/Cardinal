'use strict';

/* Create and configure application */
var angular = require('angular');

angular.module('cardinal', [
  require('angular-ui-router'),
  require('angular-material'),
  require('angular-resource')
])

.controller('DeckController', require('./deck/deck.controller.js'))
.controller('DecksController', require('./decks/decks.controller.js'))
.controller('EditorController', require('./editor/editor.controller.js'))
.controller('LoginController', require('./login/login.controller.js'))
.controller('TemplateController', require('./template/template.controller.js'))

.directive('cnSignIn', require('./components/sign-in.directive.js'))

.service('AuthService', require('./services/auth.service.js'))
.service('DataService', require('./services/data.service.js'))

.config([
  '$locationProvider', '$mdThemingProvider', '$stateProvider', '$urlRouterProvider', Config
])

.run([
  '$mdToast', '$rootScope', '$state', 'AuthService', Run
]);

function Config ($locationProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(false);

  // Set routes
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'LoginController as vm',
      params: {
        reroute: undefined
      }
    })

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

// App initialization stuff here
function Run ($mdToast, $rootScope, $state, AuthService) {
  var authenticated = false;

  // Add a convenience method for Toasts
  $mdToast.notify = function (msg) {
    $mdToast.show($mdToast
      .simple()
      .content(msg)
      .position('bottom left')
    );
  };

  // Check for Authentication prior to each route call
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (toState.name === 'login') {
      return;
    }

    if (!AuthService.isAuthenticated) {
      event.preventDefault()
      toParams.state = toState.name;
      $state.go('login', { reroute: toParams } )
    }
  });

}


/* Global utilities */

// function generateUUID () {
//   var d = new Date().getTime();
//   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     var r = (d + Math.random() * 16) % 16 | 0;
//     d = Math.floor(d / 16);
//     return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//   });
//   return uuid;
// }

// function stripPromise (promise) {
//   var result = {};
//   delete promise['$promise'];
//   delete promise['$resolved'];
//   _.assign(result, promise);
//   return result;
// }
