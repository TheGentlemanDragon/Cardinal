'use strict';

/* Create and configure application */
var angular = require('angular');

angular.module('cardinal', [
  require('angular-ui-router'),
  require('angular-resource')
])

.service('AuthService', require('./shared/auth.service.js'))
.service('ActionBarService', require('./action-bar/action-bar.service.js'))
.service('DataService', require('./shared/data.service.js'))
.service('ModalService', require('./modal/modal.service.js'))

.controller('TemplateController', require('./routes/templates/template.controller.js'))

.directive('actionBar', require('./action-bar/action-bar.directive.js'))
.directive('cnClickSelect', require('./shared/cn-click-select.directive.js'))
.directive('modal', require('./modal/modal.directive.js'))

// .directive('googleSignIn', require('./login/google-sign-in.directive.js'))

.component('games', require('./routes/games/games.component.js'))
.component('game', require('./routes/game/game.component.js'))

.component('card', require('./card/card.component.js'))
.component('editor', require('./editor/editor.component.js'))

.config([
  '$locationProvider', '$stateProvider', '$urlRouterProvider', Config
])

.run([
  '$rootScope', '$state', 'AuthService', 'ModalService', Run
]);

function Config ($locationProvider, $stateProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  // Set routes
  $stateProvider
    .state('games', {
      url: '/games',
      template: '<games></games>'
    })
    .state('game', {
      url: '/games/:gameId',
      template: '<game></game>'
    })
    .state('template', {
      url: '/templates/:templateId',
      templateUrl: 'routes/templates/template.html',
      controller: 'TemplateController as vm',
      resolve: {
        template: function (DataService, $stateParams) {
          return DataService('templates')
            .search({ _id: $stateParams.templateId })
            .$promise
            .then(response => response[0]);
        }
      }
    });


    $urlRouterProvider.otherwise('/games');
}

// App initialization stuff here
function Run ($rootScope, $state, AuthService, ModalService) {
  var authenticated = false;

  // // Check for Authentication prior to each route call
  // $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
  //   if (toState.name === 'login') {
  //     return;
  //   }
  //
  //   if (!AuthService.isAuthenticated) {
  //     event.preventDefault()
  //     toParams.state = toState.name;
  //     $state.go('login', { reroute: toParams } )
  //   }
  // });

  // Register Modals
  ModalService.register('new-game');
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
